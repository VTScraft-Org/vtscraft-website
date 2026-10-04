import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface CallBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  bookingDate: string;
  bookingTime: string;
  agenda: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private supabase = inject(SupabaseService).clientInstance;
  private readonly STORAGE_KEY = 'vtscraft_bookings';

  private _bookings = signal<CallBooking[]>([]);
  readonly bookings = this._bookings.asReadonly();
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadBookings();
  }

  async loadBookings() {
    this.isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch bookings from Supabase, checking local cache:', error);
        this.loadLocalFallback();
      } else {
        const mapped: CallBooking[] = (data || []).map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone || '',
          company: row.company || '',
          bookingDate: row.booking_date,
          bookingTime: row.booking_time,
          agenda: row.agenda || '',
          status: (row.status as CallBooking['status']) || 'Scheduled',
          createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        this._bookings.set(mapped);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mapped));
      }
    } catch {
      this.loadLocalFallback();
    } finally {
      this.isLoading.set(false);
    }
  }

  private loadLocalFallback() {
    const local = localStorage.getItem(this.STORAGE_KEY);
    if (local) {
      try {
        this._bookings.set(JSON.parse(local));
      } catch {
        this._bookings.set([]);
      }
    } else {
      this._bookings.set([]);
    }
  }

  async createBooking(booking: Omit<CallBooking, 'id' | 'createdAt' | 'status'> & { status?: CallBooking['status'] }): Promise<CallBooking> {
    const today = new Date().toISOString().split('T')[0];
    const optimistic: CallBooking = {
      ...booking,
      id: 'book-' + Date.now(),
      createdAt: today,
      status: booking.status || 'Scheduled'
    };

    // Optimistic UI update
    this._bookings.update(prev => [optimistic, ...prev]);

    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .insert({
          name: booking.name,
          email: booking.email,
          phone: booking.phone || '',
          company: booking.company || '',
          booking_date: booking.bookingDate,
          booking_time: booking.bookingTime,
          agenda: booking.agenda || '',
          status: booking.status || 'Scheduled'
        })
        .select()
        .single();

      if (!error && data) {
        const persisted: CallBooking = {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          company: data.company || '',
          bookingDate: data.booking_date,
          bookingTime: data.booking_time,
          agenda: data.agenda || '',
          status: data.status || 'Scheduled',
          createdAt: new Date(data.created_at).toISOString().split('T')[0]
        };
        this._bookings.update(prev => prev.map(b => b.id === optimistic.id ? persisted : b));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._bookings()));
        return persisted;
      }
    } catch (err) {
      console.warn('Failed to insert booking into Supabase, saved locally:', err);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._bookings()));
    return optimistic;
  }

  async updateStatus(id: string, status: CallBooking['status']) {
    this._bookings.update(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._bookings()));

    try {
      await this.supabase.from('bookings').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Failed to update booking status in Supabase:', err);
    }
  }

  async deleteBooking(id: string) {
    this._bookings.update(prev => prev.filter(b => b.id !== id));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._bookings()));

    try {
      await this.supabase.from('bookings').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete booking in Supabase:', err);
    }
  }

  /**
   * Generates a pre-filled Google Calendar event URL so the client can add it to their calendar in 1 click!
   */
  getGoogleCalendarUrl(booking: { name: string; bookingDate: string; bookingTime: string; agenda?: string }): string {
    const title = encodeURIComponent('VTScraft 30-Min Discovery Session');
    const details = encodeURIComponent(
      `Discovery session with VTScraft Engineering Team.\n\nAttendee: ${booking.name}\nTopic: ${booking.agenda || 'Project Discovery & Architecture Review'}\nMeeting link: Google Meet link will be sent prior to call.`
    );
    const location = encodeURIComponent('Google Meet / Video Call');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }

  exportToExcel() {
    const list = this._bookings();
    const headers = [
      'Booking ID',
      'Client Name',
      'Company Name',
      'Email Address',
      'Phone Number',
      'Booking Date',
      'Booking Time Slot (IST)',
      'Status',
      'Meeting Agenda',
      'Created Date'
    ];

    const rows = list.map(b => [
      `"${b.id}"`,
      `"${(b.name || '').replace(/"/g, '""')}"`,
      `"${(b.company || '').replace(/"/g, '""')}"`,
      `"${b.email || ''}"`,
      `"${b.phone || ''}"`,
      `"${b.bookingDate}"`,
      `"${b.bookingTime}"`,
      `"${b.status}"`,
      `"${(b.agenda || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`,
      `"${b.createdAt}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `VTScraft_Call_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
