import { Injectable, signal } from '@angular/core';

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
  private readonly STORAGE_KEY = 'vtscraft_jobs';

  private initialJobs: JobPosting[] = [
    {
      id: 'job-1',
      title: 'Senior Full Stack Engineer (Angular & Node.js)',
      department: 'Engineering',
      location: 'New Delhi / Remote',
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
      location: 'New Delhi / Hybrid',
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

  constructor() {
    this.loadJobs();
  }

  private loadJobs() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        this._jobs.set(JSON.parse(data));
      } catch {
        this._jobs.set(this.initialJobs);
        this.saveJobs(this.initialJobs);
      }
    } else {
      this._jobs.set(this.initialJobs);
      this.saveJobs(this.initialJobs);
    }
  }

  private saveJobs(jobs: JobPosting[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
    this._jobs.set([...jobs]);
  }

  getActiveJobs(): JobPosting[] {
    return this._jobs().filter(j => j.isActive);
  }

  addJob(job: Omit<JobPosting, 'id' | 'postedDate'>): JobPosting {
    const newJob: JobPosting = {
      ...job,
      id: 'job-' + Date.now(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newJob, ...this._jobs()];
    this.saveJobs(updated);
    return newJob;
  }

  updateJob(id: string, updates: Partial<JobPosting>) {
    const updated = this._jobs().map(j => j.id === id ? { ...j, ...updates } : j);
    this.saveJobs(updated);
  }

  deleteJob(id: string) {
    const updated = this._jobs().filter(j => j.id !== id);
    this.saveJobs(updated);
  }

  toggleActive(id: string) {
    const updated = this._jobs().map(j => j.id === id ? { ...j, isActive: !j.isActive } : j);
    this.saveJobs(updated);
  }
}
