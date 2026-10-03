import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  // Calendar interactive state
  selectedDate = signal<number>(15);
  selectedTime = signal<string>('02:30 PM');
  calendarBooked = signal<boolean>(false);

  availableDates = [12, 13, 14, 15, 16, 17, 19, 20];
  availableTimes = ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '05:30 PM'];

  // Form model
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

  selectDate(d: number) {
    this.selectedDate.set(d);
  }

  selectTime(t: string) {
    this.selectedTime.set(t);
  }

  confirmCalendarBooking() {
    this.calendarBooked.set(true);
  }

  submitContact() {
    if (!this.contactForm.name || !this.contactForm.email) {
      alert('Please fill in your name and email.');
      return;
    }
    this.formSubmitted.set(true);
  }
}
