export interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter: string;
  resumeUrl?: string;
  submittedAt: Date;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected';
}
