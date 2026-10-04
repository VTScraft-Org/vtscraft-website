import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  resumeFileName: string;
  resumeUrl?: string;
  coverLetter: string;
  date: string;
  status: 'Submitted' | 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected';
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.clientInstance;
  private readonly STORAGE_KEY = 'vtscraft_applications';

  private _applications = signal<JobApplication[]>([]);
  readonly applications = this._applications.asReadonly();
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadApplications();
  }

  async loadApplications() {
    this.isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('applications')
        .select('*')
        .order('applied_date', { ascending: false });

      if (error) {
        console.warn('Could not fetch applications from Supabase, checking local cache:', error);
        this.loadLocalFallback();
      } else {
        const mapped: JobApplication[] = (data || []).map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          position: row.position,
          resumeFileName: row.resume_filename || 'Resume.pdf',
          resumeUrl: row.resume_url || '',
          coverLetter: row.cover_letter || '',
          date: row.applied_date ? new Date(row.applied_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: row.status || 'Pending'
        }));
        this._applications.set(mapped);
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
        const parsed: JobApplication[] = JSON.parse(local);
        // Exclude legacy mock seeds
        const realOnly = parsed.filter(a => !['app-1', 'app-2', 'app-3'].includes(a.id));
        this._applications.set(realOnly);
      } catch {
        this._applications.set([]);
      }
    } else {
      this._applications.set([]);
    }
  }

  async uploadResumeFile(file: File): Promise<{ publicUrl: string; fileName: string }> {
    return this.supabaseService.uploadResume(file);
  }

  async submitApplication(app: Omit<JobApplication, 'id' | 'date' | 'status'> & { status?: JobApplication['status'] }): Promise<JobApplication> {
    const today = new Date().toISOString().split('T')[0];
    const optimisticApp: JobApplication = {
      ...app,
      id: 'app-' + Date.now(),
      date: today,
      status: app.status || 'Pending',
      resumeUrl: app.resumeUrl || ''
    };

    // Optimistic UI update
    this._applications.update(prev => [optimisticApp, ...prev]);

    try {
      const { data, error } = await this.supabase
        .from('applications')
        .insert({
          name: app.name,
          email: app.email,
          phone: app.phone,
          position: app.position,
          resume_url: app.resumeUrl || '',
          resume_filename: app.resumeFileName || '',
          cover_letter: app.coverLetter || '',
          status: app.status || 'Pending'
        })
        .select()
        .single();

      if (!error && data) {
        const persistedApp: JobApplication = {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          resumeFileName: data.resume_filename || app.resumeFileName,
          resumeUrl: data.resume_url || app.resumeUrl,
          coverLetter: data.cover_letter || app.coverLetter,
          date: new Date(data.applied_date).toISOString().split('T')[0],
          status: data.status || 'Pending'
        };
        this._applications.update(prev => prev.map(a => a.id === optimisticApp.id ? persistedApp : a));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._applications()));
        return persistedApp;
      }
    } catch (err) {
      console.warn('Failed to sync application to Supabase, saved locally:', err);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._applications()));
    return optimisticApp;
  }

  async updateStatus(id: string, status: JobApplication['status']) {
    this._applications.update(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._applications()));

    try {
      await this.supabase.from('applications').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Failed to update status in Supabase:', err);
    }
  }

  async deleteApplication(id: string) {
    this._applications.update(prev => prev.filter(a => a.id !== id));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._applications()));

    try {
      await this.supabase.from('applications').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete application in Supabase:', err);
    }
  }

  exportToExcel() {
    const apps = this._applications();
    const headers = [
      'Candidate ID',
      'Name',
      'Email',
      'Phone',
      'Position Applied',
      'Status',
      'Date Applied',
      'Resume File Name',
      'Direct Resume Link (Click to View PDF)',
      'Cover Letter'
    ];
    
    // Create CSV content with UTF-8 BOM for flawless Excel rendering
    const rows = apps.map(a => [
      `"${a.id}"`,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${a.email || ''}"`,
      `"${a.phone || ''}"`,
      `"${(a.position || '').replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.date}"`,
      `"${(a.resumeFileName || '').replace(/"/g, '""')}"`,
      `"${a.resumeUrl || 'No file attached'}"`,
      `"${(a.coverLetter || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
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
