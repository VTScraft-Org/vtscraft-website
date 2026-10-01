import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {
  formSubmitted = signal(false);
  isSubmitting = signal(false);

  formData = {
    fullName: '',
    email: '',
    company: '',
    service: 'Mobile Apps',
    budget: '$5,000 - $15,000',
    timeline: '1 - 3 months',
    message: ''
  };

  servicesList = [
    'Mobile App Development (iOS & Android)',
    'Modern Web Engineering & Portals',
    'Admin Panels & Business Dashboards',
    'Custom Software & Microservices',
    'Cloud Architecture & DevOps',
    'UI/UX Design Systems'
  ];

  budgets = [
    '< $5,000',
    '$5,000 - $15,000',
    '$15,000 - $35,000',
    '$35,000+'
  ];

  timelines = [
    'Immediate (within 2 weeks)',
    '1 - 3 months',
    '3 - 6 months',
    'Flexible'
  ];

  onSubmit(): void {
    if (!this.formData.fullName || !this.formData.email) {
      alert('Please fill in your name and email address.');
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.formSubmitted.set(true);
    }, 700);
  }

  resetForm(): void {
    this.formData = {
      fullName: '',
      email: '',
      company: '',
      service: 'Mobile Apps',
      budget: '$5,000 - $15,000',
      timeline: '1 - 3 months',
      message: ''
    };
    this.formSubmitted.set(false);
  }
}
