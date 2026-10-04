import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
  status: 'New Lead' | 'Contacted' | 'Proposal Sent' | 'Won' | 'Archived';
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class InquiriesService {
  private supabase = inject(SupabaseService).clientInstance;
  private readonly STORAGE_KEY = 'vtscraft_inquiries';

  private _inquiries = signal<ClientInquiry[]>([]);
  readonly inquiries = this._inquiries.asReadonly();
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadInquiries();
  }

  async loadInquiries() {
    this.isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch inquiries from Supabase, checking local cache:', error);
        this.loadLocalFallback();
      } else {
        const mapped: ClientInquiry[] = (data || []).map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          company: row.company || '',
          phone: row.phone || '',
          serviceInterest: row.service_interest,
          budgetRange: row.budget_range,
          message: row.message || '',
          status: (row.status as ClientInquiry['status']) || 'New Lead',
          date: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        this._inquiries.set(mapped);
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
        this._inquiries.set(JSON.parse(local));
      } catch {
        this._inquiries.set([]);
      }
    } else {
      this._inquiries.set([]);
    }
  }

  async submitInquiry(inquiry: Omit<ClientInquiry, 'id' | 'date' | 'status'> & { status?: ClientInquiry['status'] }): Promise<ClientInquiry> {
    const today = new Date().toISOString().split('T')[0];
    const optimistic: ClientInquiry = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      date: today,
      status: inquiry.status || 'New Lead',
    };

    // Optimistic UI update
    this._inquiries.update(prev => [optimistic, ...prev]);

    try {
      const { data, error } = await this.supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company || '',
          phone: inquiry.phone || '',
          service_interest: inquiry.serviceInterest,
          budget_range: inquiry.budgetRange,
          message: inquiry.message || '',
          status: inquiry.status || 'New Lead'
        })
        .select()
        .single();

      if (!error && data) {
        const persisted: ClientInquiry = {
          id: data.id,
          name: data.name,
          email: data.email,
          company: data.company || '',
          phone: data.phone || '',
          serviceInterest: data.service_interest,
          budgetRange: data.budget_range,
          message: data.message || '',
          status: data.status || 'New Lead',
          date: new Date(data.created_at).toISOString().split('T')[0]
        };
        this._inquiries.update(prev => prev.map(i => i.id === optimistic.id ? persisted : i));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._inquiries()));
        return persisted;
      }
    } catch (err) {
      console.warn('Failed to insert inquiry into Supabase, saved locally:', err);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._inquiries()));
    return optimistic;
  }

  async updateStatus(id: string, status: ClientInquiry['status']) {
    this._inquiries.update(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._inquiries()));

    try {
      await this.supabase.from('inquiries').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Failed to update inquiry status in Supabase:', err);
    }
  }

  async deleteInquiry(id: string) {
    this._inquiries.update(prev => prev.filter(i => i.id !== id));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._inquiries()));

    try {
      await this.supabase.from('inquiries').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete inquiry in Supabase:', err);
    }
  }

  exportToExcel() {
    const list = this._inquiries();
    const headers = [
      'Lead ID',
      'Client Name',
      'Company Name',
      'Email Address',
      'Phone Number',
      'Service Requested',
      'Budget Range',
      'Status',
      'Date Submitted',
      'Project Requirements / Brief'
    ];

    const rows = list.map(i => [
      `"${i.id}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${i.email || ''}"`,
      `"${i.phone || ''}"`,
      `"${(i.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${i.budgetRange || ''}"`,
      `"${i.status}"`,
      `"${i.date}"`,
      `"${(i.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `VTScraft_Client_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
