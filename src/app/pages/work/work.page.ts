import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { ProjectItem } from '../../models/project.model';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work.page.html',
  styleUrl: './work.page.scss'
})
export class WorkPage {
  dataService = inject(DataService);
  projects = this.dataService.projects;

  selectedCategory = signal<string>('all');

  categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Admin Panels & CRM', value: 'Admin Panels & CRM' },
    { label: 'Mobile Apps', value: 'Mobile Apps' },
    { label: 'Websites & Portals', value: 'Websites & Portals' },
    { label: 'Custom Software', value: 'Custom Software' }
  ];

  filteredProjects(): ProjectItem[] {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.projects;
    return this.projects.filter(p => p.category === cat);
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }
}
