import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JobsService, JobPosting } from '../../core/services/jobs.service';
import { ApplicationsService, JobApplication } from '../../core/services/applications.service';
import { InquiriesService, ClientInquiry } from '../../core/services/inquiries.service';
import { BookingsService, CallBooking } from '../../core/services/bookings.service';

type AdminTab = 'dashboard' | 'jobs' | 'applications' | 'inquiries' | 'bookings';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent {
  auth = inject(AuthService);
  router = inject(Router);
  jobsService = inject(JobsService);
  applicationsService = inject(ApplicationsService);
  inquiriesService = inject(InquiriesService);
  bookingsService = inject(BookingsService);

  activeTab = signal<AdminTab>('dashboard');

  // Job Modal State
  isJobModalOpen = signal(false);
  isEditing = signal(false);
  editingJobId: string | null = null;

  // Inquiry Details Modal
  selectedInquiry = signal<ClientInquiry | null>(null);

  jobForm: {
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
    description: string;
    requirements: string;
    isActive: boolean;
  } = {
    title: '',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: '',
    requirements: '',
    isActive: true
  };

  departments = ['Engineering', 'AI & Automation', 'Design', 'Operations', 'Product'];
  jobTypes: Array<'Full-time' | 'Part-time' | 'Remote' | 'Contract'> = [
    'Full-time',
    'Part-time',
    'Remote',
    'Contract'
  ];

  applicationStatuses: JobApplication['status'][] = ['Submitted', 'Pending', 'Reviewed', 'Shortlisted', 'Rejected'];
  inquiryStatuses: ClientInquiry['status'][] = ['New Lead', 'Contacted', 'Proposal Sent', 'Won', 'Archived'];
  bookingStatuses: CallBooking['status'][] = ['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'];

  get allJobs(): JobPosting[] {
    return this.jobsService.jobs();
  }

  get activeJobsCount(): number {
    return this.allJobs.filter(j => j.isActive).length;
  }

  get allApplications(): JobApplication[] {
    return this.applicationsService.applications();
  }

  get allInquiries(): ClientInquiry[] {
    return this.inquiriesService.inquiries();
  }

  get allBookings(): CallBooking[] {
    return this.bookingsService.bookings();
  }

  get newLeadsCount(): number {
    return this.allInquiries.filter(i => i.status === 'New Lead').length;
  }

  get upcomingBookingsCount(): number {
    return this.allBookings.filter(b => b.status === 'Scheduled').length;
  }

  setActiveTab(tab: AdminTab) {
    this.activeTab.set(tab);
  }

  // ─── Job Actions ──────────────────────────────────────────────────────────
  openAddJobModal() {
    this.isEditing.set(false);
    this.editingJobId = null;
    this.jobForm = {
      title: '',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: '',
      requirements: '',
      isActive: true
    };
    this.isJobModalOpen.set(true);
  }

  openEditJobModal(job: JobPosting) {
    this.isEditing.set(true);
    this.editingJobId = job.id;
    this.jobForm = {
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      isActive: job.isActive
    };
    this.isJobModalOpen.set(true);
  }

  closeJobModal() {
    this.isJobModalOpen.set(false);
  }

  saveJob() {
    if (!this.jobForm.title || !this.jobForm.description) {
      alert('Please fill in Job Title and Description.');
      return;
    }

    if (this.isEditing() && this.editingJobId) {
      this.jobsService.updateJob(this.editingJobId, this.jobForm);
    } else {
      this.jobsService.addJob(this.jobForm);
    }

    this.closeJobModal();
  }

  deleteJob(id: string) {
    if (confirm('Are you sure you want to delete this job posting?')) {
      this.jobsService.deleteJob(id);
    }
  }

  toggleJobActive(id: string) {
    this.jobsService.toggleActive(id);
  }

  // ─── Applications Actions ────────────────────────────────────────────────
  downloadExcel() {
    this.applicationsService.exportToExcel();
  }

  deleteApplication(id: string) {
    if (confirm('Delete this application record?')) {
      this.applicationsService.deleteApplication(id);
    }
  }

  updateApplicationStatus(id: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as JobApplication['status'];
    this.applicationsService.updateStatus(id, newStatus);
  }

  // ─── Inquiries Actions ───────────────────────────────────────────────────
  downloadInquiriesExcel() {
    this.inquiriesService.exportToExcel();
  }

  deleteInquiry(id: string) {
    if (confirm('Delete this client inquiry record?')) {
      this.inquiriesService.deleteInquiry(id);
    }
  }

  updateInquiryStatus(id: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as ClientInquiry['status'];
    this.inquiriesService.updateStatus(id, newStatus);
  }

  viewInquiryDetails(inquiry: ClientInquiry) {
    this.selectedInquiry.set(inquiry);
  }

  closeInquiryDetails() {
    this.selectedInquiry.set(null);
  }

  // ─── Bookings Actions ────────────────────────────────────────────────────
  downloadBookingsExcel() {
    this.bookingsService.exportToExcel();
  }

  deleteBooking(id: string) {
    if (confirm('Delete this scheduled call record?')) {
      this.bookingsService.deleteBooking(id);
    }
  }

  updateBookingStatus(id: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as CallBooking['status'];
    this.bookingsService.updateStatus(id, newStatus);
  }

  getGoogleCalendarUrl(booking: CallBooking): string {
    return this.bookingsService.getGoogleCalendarUrl({
      name: booking.name,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      agenda: booking.agenda
    });
  }

  // ─── 1-Click Contact Utilities ──────────────────────────────────────────
  openWhatsApp(phone: string, name: string) {
    if (!phone) {
      alert('No phone number provided for this client.');
      return;
    }
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(`Hi ${name}, thank you for connecting with VTScraft! We received your details and would love to follow up on your project.`);
    window.open(`https://wa.me/${cleanNumber}?text=${greeting}`, '_blank');
  }

  getEmailLink(email: string, name: string, topic: string): string {
    const subject = encodeURIComponent(`VTScraft Follow-up: ${topic}`);
    const body = encodeURIComponent(`Hi ${name},\n\nThank you for connecting with VTScraft regarding ${topic}.\n\nLooking forward to speaking with you.\n\nBest regards,\nVTScraft Team\nhttps://vtscraft.com`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }

  // ─── Logout ──────────────────────────────────────────────────────────────
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
