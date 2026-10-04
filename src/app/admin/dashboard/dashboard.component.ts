import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JobsService, JobPosting } from '../../core/services/jobs.service';
import { ApplicationsService, JobApplication } from '../../core/services/applications.service';

type AdminTab = 'dashboard' | 'jobs' | 'applications';

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

  activeTab = signal<AdminTab>('dashboard');

  // Job Modal State
  isJobModalOpen = signal(false);
  isEditing = signal(false);
  editingJobId: string | null = null;

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

  get allJobs(): JobPosting[] {
    return this.jobsService.jobs();
  }

  applicationStatuses: JobApplication['status'][] = ['Submitted', 'Pending', 'Reviewed', 'Shortlisted', 'Rejected'];

  get activeJobsCount(): number {
    return this.allJobs.filter(j => j.isActive).length;
  }

  get allApplications(): JobApplication[] {
    return this.applicationsService.applications();
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

  // ─── Logout ──────────────────────────────────────────────────────────────
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
