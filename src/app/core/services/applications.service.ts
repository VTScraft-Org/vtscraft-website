import { Injectable, signal } from '@angular/core';

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  resumeFileName: string;
  coverLetter: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected';
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private readonly STORAGE_KEY = 'vtscraft_applications';

  private initialApplications: JobApplication[] = [
    {
      id: 'app-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      position: 'Senior Full Stack Engineer (Angular & Node.js)',
      resumeFileName: 'Aarav_Sharma_Resume.pdf',
      coverLetter: 'Experienced full stack developer with 5 years leading Angular frontend architecture and REST/GraphQL microservices.',
      date: '2026-09-28',
      status: 'Reviewed'
    },
    {
      id: 'app-2',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98112 34567',
      position: 'AI / LLM Solutions Architect',
      resumeFileName: 'Priya_Patel_CV.pdf',
      coverLetter: 'Passionate AI engineer building agentic RAG workflows and autonomous multi-agent systems using LangChain and FastAPI.',
      date: '2026-09-30',
      status: 'Shortlisted'
    },
    {
      id: 'app-3',
      name: 'Rohan Verma',
      email: 'rohan.v@example.com',
      phone: '+91 99887 76655',
      position: 'Product Designer (UI/UX)',
      resumeFileName: 'Rohan_Verma_Portfolio.pdf',
      coverLetter: 'SaaS product designer focused on clean typography, accessibility, and high-velocity Figma design system libraries.',
      date: '2026-10-01',
      status: 'Pending'
    }
  ];

  private _applications = signal<JobApplication[]>([]);
  readonly applications = this._applications.asReadonly();

  constructor() {
    this.loadApplications();
  }

  private loadApplications() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        this._applications.set(JSON.parse(data));
      } catch {
        this._applications.set(this.initialApplications);
        this.saveApplications(this.initialApplications);
      }
    } else {
      this._applications.set(this.initialApplications);
      this.saveApplications(this.initialApplications);
    }
  }

  private saveApplications(apps: JobApplication[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apps));
    this._applications.set([...apps]);
  }

  submitApplication(app: Omit<JobApplication, 'id' | 'date' | 'status'>): JobApplication {
    const newApp: JobApplication = {
      ...app,
      id: 'app-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    const updated = [newApp, ...this._applications()];
    this.saveApplications(updated);
    return newApp;
  }

  updateStatus(id: string, status: JobApplication['status']) {
    const updated = this._applications().map(a => a.id === id ? { ...a, status } : a);
    this.saveApplications(updated);
  }

  deleteApplication(id: string) {
    const updated = this._applications().filter(a => a.id !== id);
    this.saveApplications(updated);
  }

  exportToExcel() {
    const apps = this._applications();
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Position Applied', 'Resume File', 'Cover Letter', 'Date', 'Status'];
    
    // Create CSV content with UTF-8 BOM for flawless Excel rendering
    const rows = apps.map(a => [
      `"${a.id}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.position.replace(/"/g, '""')}"`,
      `"${a.resumeFileName}"`,
      `"${a.coverLetter.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${a.date}"`,
      `"${a.status}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `VTScraft_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
