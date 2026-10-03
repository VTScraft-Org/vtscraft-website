import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService, JobPosting } from '../../core/services/jobs.service';
import { ApplicationsService } from '../../core/services/applications.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  jobsService = inject(JobsService);
  applicationsService = inject(ApplicationsService);

  // Modal state
  isModalOpen = signal(false);
  isSubmitted = signal(false);
  selectedPosition = signal('');

  // Form model
  formData = {
    name: '',
    email: '',
    phone: '',
    position: '',
    resumeFileName: '',
    coverLetter: ''
  };

  // General application form model
  generalFormData = {
    name: '',
    email: '',
    phone: '',
    position: 'General Application / Open Role',
    resumeFileName: '',
    coverLetter: ''
  };
  generalSubmitted = signal(false);

  get activeJobs(): JobPosting[] {
    return this.jobsService.getActiveJobs();
  }

  openApplyModal(positionTitle: string) {
    this.selectedPosition.set(positionTitle);
    this.formData.position = positionTitle;
    this.formData.name = '';
    this.formData.email = '';
    this.formData.phone = '';
    this.formData.resumeFileName = '';
    this.formData.coverLetter = '';
    this.isSubmitted.set(false);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.formData.resumeFileName = input.files[0].name;
    }
  }

  handleGeneralFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.generalFormData.resumeFileName = input.files[0].name;
    }
  }

  submitModalApplication() {
    if (!this.formData.name || !this.formData.email || !this.formData.phone) {
      alert('Please fill in required fields (Name, Email, Phone).');
      return;
    }

    this.applicationsService.submitApplication({
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      position: this.formData.position || this.selectedPosition(),
      resumeFileName: this.formData.resumeFileName || 'Resume_Attached.pdf',
      coverLetter: this.formData.coverLetter
    });

    this.isSubmitted.set(true);
    setTimeout(() => {
      this.closeModal();
    }, 2500);
  }

  submitGeneralApplication() {
    if (!this.generalFormData.name || !this.generalFormData.email || !this.generalFormData.phone) {
      alert('Please fill in required fields (Name, Email, Phone).');
      return;
    }

    this.applicationsService.submitApplication({
      name: this.generalFormData.name,
      email: this.generalFormData.email,
      phone: this.generalFormData.phone,
      position: this.generalFormData.position,
      resumeFileName: this.generalFormData.resumeFileName || 'General_Resume.pdf',
      coverLetter: this.generalFormData.coverLetter
    });

    this.generalSubmitted.set(true);
  }
}
