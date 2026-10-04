import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquiriesService } from '../../core/services/inquiries.service';
import { BookingsService, CallBooking } from '../../core/services/bookings.service';

export interface CalendarSlot {
  dateNum: number;
  dayLabel: string;
  monthLabel: string;
  fullDateStr: string;
  isoDateStr: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private inquiriesService = inject(InquiriesService);
  private bookingsService = inject(BookingsService);

  // Dynamic calendar dates: Next 7 business days from today
  availableDates: CalendarSlot[] = this.generateUpcomingBusinessDays();
  selectedSlot = signal<CalendarSlot>(this.availableDates[0]);
  selectedTime = signal<string>('02:30 PM');

  availableTimes = ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  // Booking Modal & State
  isBookingModalOpen = signal<boolean>(false);
  isBookingSubmitting = signal<boolean>(false);
  calendarBooked = signal<boolean>(false);
  confirmedBooking = signal<CallBooking | null>(null);

  bookingForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    agenda: ''
  };

  // Inquiry Form model
  contactForm = {
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceInterest: 'AI & LLM Automation',
    budgetRange: '$10,000 - $25,000',
    message: ''
  };

  formSubmitted = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  services = [
    'AI & LLM Automation',
    'Software / Website Development',
    'Mobile App Development',
    'CRM/ERP Solutions',
    'UI/UX Design & Creative',
    'Full-Stack Architecture'
  ];

  budgets = [
    '< $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  private generateUpcomingBusinessDays(): CalendarSlot[] {
    const slots: CalendarSlot[] = [];
    const now = new Date();
    const cursor = new Date(now);

    while (slots.length < 8) {
      cursor.setDate(cursor.getDate() + 1);
      const day = cursor.getDay();
      // Only include business days (Monday=1 to Friday=5)
      if (day !== 0 && day !== 6) {
        const dayLabel = cursor.toLocaleDateString('en-US', { weekday: 'short' });
        const monthLabel = cursor.toLocaleDateString('en-US', { month: 'short' });
        const dateNum = cursor.getDate();
        const year = cursor.getFullYear();
        slots.push({
          dateNum,
          dayLabel,
          monthLabel,
          fullDateStr: `${dayLabel}, ${monthLabel} ${dateNum}, ${year}`,
          isoDateStr: cursor.toISOString().split('T')[0]
        });
      }
    }
    return slots;
  }

  selectSlot(slot: CalendarSlot) {
    this.selectedSlot.set(slot);
  }

  selectTime(t: string) {
    this.selectedTime.set(t);
  }

  openBookingModal() {
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal() {
    this.isBookingModalOpen.set(false);
  }

  async submitCallBooking() {
    if (!this.bookingForm.name || !this.bookingForm.email) {
      alert('Please provide your name and email address.');
      return;
    }

    this.isBookingSubmitting.set(true);
    const slot = this.selectedSlot();

    try {
      const created = await this.bookingsService.createBooking({
        name: this.bookingForm.name,
        email: this.bookingForm.email,
        phone: this.bookingForm.phone,
        company: this.bookingForm.company,
        bookingDate: slot.fullDateStr,
        bookingTime: this.selectedTime(),
        agenda: this.bookingForm.agenda
      });

      this.confirmedBooking.set(created);
      this.calendarBooked.set(true);
      this.closeBookingModal();
    } catch (err) {
      console.error('Failed to submit booking:', err);
      this.calendarBooked.set(true);
      this.closeBookingModal();
    } finally {
      this.isBookingSubmitting.set(false);
    }
  }

  getGoogleCalendarUrl(): string {
    const slot = this.selectedSlot();
    return this.bookingsService.getGoogleCalendarUrl({
      name: this.bookingForm.name || 'Client',
      bookingDate: slot.fullDateStr,
      bookingTime: this.selectedTime(),
      agenda: this.bookingForm.agenda
    });
  }

  resetBooking() {
    this.calendarBooked.set(false);
    this.confirmedBooking.set(null);
  }

  async submitContact() {
    if (!this.contactForm.name || !this.contactForm.email) {
      alert('Please fill in your name and email address.');
      return;
    }

    this.isSubmitting.set(true);

    try {
      await this.inquiriesService.submitInquiry({
        name: this.contactForm.name,
        email: this.contactForm.email,
        company: this.contactForm.company,
        phone: this.contactForm.phone,
        serviceInterest: this.contactForm.serviceInterest,
        budgetRange: this.contactForm.budgetRange,
        message: this.contactForm.message
      });
      this.formSubmitted.set(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      this.formSubmitted.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
