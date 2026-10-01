import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formSubmitted = signal(false);
  isSubmitting = signal(false);

  formData = {
    fullName: '',
    email: '',
    company: '',
    service: 'Mobile Apps',
    budget: '$5k - $15k',
    message: ''
  };

  servicesList = [
    'Mobile Apps',
    'Websites & Portals',
    'Admin Panels & Dashboards',
    'Custom Software',
    'Full Product Architecture'
  ];

  onSubmit(): void {
    if (!this.formData.fullName || !this.formData.email) {
      alert('Please provide your name and email address.');
      return;
    }

    this.isSubmitting.set(true);

    // Simulate submission
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
      budget: '$5k - $15k',
      message: ''
    };
    this.formSubmitted.set(false);
  }
}
