import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  description: string;
  requirements: string;
  isActive: boolean;
  postedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private supabase = inject(SupabaseService).clientInstance;
  private readonly STORAGE_KEY = 'vtscraft_jobs';

  private initialJobs: JobPosting[] = [
    {
      id: 'job-1',
      title: 'Senior Full Stack Engineer (Angular & Node.js)',
      department: 'Engineering',
      location: 'Whitefield, Bangalore / Remote',
      type: 'Full-time',
      description: 'Lead the architecture and delivery of high-throughput client platforms and internal tools with clean reactive architecture and strict TypeScript standards.',
      requirements: '4+ years Angular/TypeScript experience, solid Node.js/PostgreSQL knowledge, microservices and automated CI/CD expertise.',
      isActive: true,
      postedDate: '2026-09-15'
    },
    {
      id: 'job-2',
      title: 'AI / LLM Solutions Architect',
      department: 'AI & Automation',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design and deploy production-grade LLM workflows, LangChain / LlamaIndex retrieval pipelines, and autonomous agent systems for enterprise clients.',
      requirements: 'Hands-on experience with Python, OpenAI/Anthropic APIs, vector databases (Pinecone/Milvus), prompt engineering, and RAG evaluation.',
      isActive: true,
      postedDate: '2026-09-20'
    },
    {
      id: 'job-3',
      title: 'Product Designer (UI/UX)',
      department: 'Design',
      location: 'Whitefield, Bangalore / Hybrid',
      type: 'Full-time',
      description: 'Craft bold, minimalist, high-converting digital interfaces in Figma, collaborating closely with engineers to build unified design tokens.',
      requirements: 'Proven portfolio in modern SaaS web apps, deep Figma component mastery, strong typography, and micro-interaction intuition.',
      isActive: true,
      postedDate: '2026-09-25'
    },
    {
      id: 'job-4',
      title: 'Mobile App Developer (Flutter / React Native)',
      department: 'Engineering',
      location: 'Remote',
      type: 'Contract',
      description: 'Build offline-first mobile apps for logistics and field operations with fluid animations, push notifications, and biometric authentication.',
      requirements: '3+ years cross-platform mobile development, App Store & Google Play deployment lifecycle, state management mastery.',
      isActive: true,
      postedDate: '2026-09-28'
    }
  ];

  private _jobs = signal<JobPosting[]>([]);
  readonly jobs = this._jobs.asReadonly();
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadJobs();
  }

  async loadJobs() {
    this.isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to localStorage or seed
        this.loadLocalFallback();
      } else {
        const mapped: JobPosting[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          department: row.department,
          location: row.location,
          type: row.type,
          description: row.description,
          requirements: row.requirements,
          isActive: row.is_active ?? true,
          postedDate: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        this._jobs.set(mapped);
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
        this._jobs.set(JSON.parse(local));
      } catch {
        this._jobs.set(this.initialJobs);
      }
    } else {
      this._jobs.set(this.initialJobs);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.initialJobs));
    }
  }

  getActiveJobs(): JobPosting[] {
    return this._jobs().filter(j => j.isActive);
  }

  async addJob(job: Omit<JobPosting, 'id' | 'postedDate'>): Promise<JobPosting> {
    const today = new Date().toISOString().split('T')[0];
    const optimisticJob: JobPosting = {
      ...job,
      id: 'job-' + Date.now(),
      postedDate: today
    };

    // Optimistic UI update
    this._jobs.update(prev => [optimisticJob, ...prev]);

    try {
      const { data, error } = await this.supabase
        .from('jobs')
        .insert({
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          description: job.description,
          requirements: job.requirements,
          is_active: job.isActive
        })
        .select()
        .single();

      if (!error && data) {
        const persistedJob: JobPosting = {
          id: data.id,
          title: data.title,
          department: data.department,
          location: data.location,
          type: data.type,
          description: data.description,
          requirements: data.requirements,
          isActive: data.is_active,
          postedDate: new Date(data.created_at).toISOString().split('T')[0]
        };
        // Replace optimistic job with persisted record
        this._jobs.update(prev => prev.map(j => j.id === optimisticJob.id ? persistedJob : j));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._jobs()));
        return persistedJob;
      }
    } catch (err) {
      console.warn('Failed to sync job with Supabase, kept in local storage:', err);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._jobs()));
    return optimisticJob;
  }

  async updateJob(id: string, updates: Partial<JobPosting>) {
    this._jobs.update(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._jobs()));

    try {
      const payload: any = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.department !== undefined) payload.department = updates.department;
      if (updates.location !== undefined) payload.location = updates.location;
      if (updates.type !== undefined) payload.type = updates.type;
      if (updates.description !== undefined) payload.description = updates.description;
      if (updates.requirements !== undefined) payload.requirements = updates.requirements;
      if (updates.isActive !== undefined) payload.is_active = updates.isActive;

      await this.supabase.from('jobs').update(payload).eq('id', id);
    } catch (err) {
      console.warn('Failed to update job in Supabase:', err);
    }
  }

  async deleteJob(id: string) {
    this._jobs.update(prev => prev.filter(j => j.id !== id));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._jobs()));

    try {
      await this.supabase.from('jobs').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete job in Supabase:', err);
    }
  }

  async toggleActive(id: string) {
    const job = this._jobs().find(j => j.id === id);
    if (job) {
      const newActive = !job.isActive;
      this.updateJob(id, { isActive: newActive });
    }
  }
}
