import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProjectCard {
  tag: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  bgGradient: string;
  mockType: string;
  image: string;
}

@Component({
  selector: 'app-work-showcase',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work-showcase.component.html',
  styleUrls: ['./work-showcase.component.scss']
})
export class WorkShowcaseComponent {
  projects: ProjectCard[] = [
    {
      tag: 'CRM & ERP',
      title: 'Custom CRM',
      category: 'Enterprise Operations',
      description: 'Unified sales pipeline, automated billing, and real-time lead allocation built specifically for high-velocity logistics operations.',
      metrics: '3.4x Pipeline Velocity',
      bgGradient: 'from-[#0D1B2A] via-[#122b49] to-[#0A1118]',
      mockType: 'crm',
      image: '/images/work/crm-app.png'
    },
    {
      tag: 'CYBERSECURITY',
      title: 'VMS Platform',
      category: 'Vulnerability Management',
      description: 'Centralized vulnerability intelligence and automated patch prioritization engine guarding financial data across 4 continents.',
      metrics: '99.99% Audit Pass Rate',
      bgGradient: 'from-[#061826] via-[#092d3b] to-[#0D1B2A]',
      mockType: 'security',
      image: '/images/work/vms-platform.png'
    },
    {
      tag: 'WEB APP',
      title: 'Client Portal',
      category: 'Fintech & Wealth',
      description: 'High-security client investment dashboard featuring real-time telemetry, automated reporting, and encrypted document sharing.',
      metrics: '45k+ Daily Users',
      bgGradient: 'from-[#102027] via-[#1c313a] to-[#0D1B2A]',
      mockType: 'portal',
      image: '/images/work/rental-ms.png'
    }
  ];

  activeIndex = signal(0);

  nextProject() {
    this.activeIndex.update(idx => (idx + 1) % this.projects.length);
  }

  prevProject() {
    this.activeIndex.update(idx => (idx - 1 + this.projects.length) % this.projects.length);
  }

  goTo(idx: number) {
    this.activeIndex.set(idx);
  }
}
