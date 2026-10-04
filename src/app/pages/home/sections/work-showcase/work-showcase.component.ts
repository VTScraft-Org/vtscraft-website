import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

export interface ProjectCard {
  tag: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  bgGradient: string;
  mockType: string;
  image: string;
  targetId: string;
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
      image: '/images/work/crm-app.png',
      targetId: 'lylux-crm'
    },
    {
      tag: 'CYBERSECURITY',
      title: 'VMS Platform',
      category: 'Vulnerability Management',
      description: 'Centralized vulnerability intelligence and automated patch prioritization engine guarding financial data across 4 continents.',
      metrics: '99.99% Audit Pass Rate',
      bgGradient: 'from-[#061826] via-[#092d3b] to-[#0D1B2A]',
      mockType: 'security',
      image: '/images/work/vms-platform.png',
      targetId: 'secure-thread-vms'
    },
    {
      tag: 'WEB APP',
      title: 'Client Portal',
      category: 'Fintech & Wealth',
      description: 'High-security client investment dashboard featuring real-time telemetry, automated reporting, and encrypted document sharing.',
      metrics: '45k+ Daily Users',
      bgGradient: 'from-[#102027] via-[#1c313a] to-[#0D1B2A]',
      mockType: 'portal',
      image: '/images/work/rental-ms.png',
      targetId: 'finnova-client-portal'
    },
    {
      tag: 'AI AUTOMATION',
      title: 'Sales Outreach Agent',
      category: 'LLM Multi-Agent System',
      description: 'Autonomous multi-agent system automating prospect discovery, company enrichment, and personalized omnichannel conversations.',
      metrics: '85% Manual Ops Saved',
      bgGradient: 'from-[#0B1E28] via-[#0D2E2B] to-[#06141B]',
      mockType: 'agent',
      image: '/images/work/sales-agent.png',
      targetId: 'sales-outreach-agent'
    },
    {
      tag: 'SAAS PLATFORM',
      title: 'Rental MS Platform',
      category: 'Inventory & Fleet',
      description: 'Flexible rental management platform built to streamline inventory, automated bookings, and multi-branch financial ledgers.',
      metrics: '120k+ Assets Managed',
      bgGradient: 'from-[#12211C] via-[#0F3124] to-[#081812]',
      mockType: 'rental',
      image: '/images/work/rental-ms.png',
      targetId: 'trendz-rental-ms'
    }
  ];

  activeIndex = signal(0);
  windowWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1200);

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.windowWidth.set(window.innerWidth);
    }
  }

  get visibleCardsCount(): number {
    const w = this.windowWidth();
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.visibleCardsCount);
  }

  nextProject() {
    this.activeIndex.update(idx => (idx >= this.maxIndex ? 0 : idx + 1));
  }

  prevProject() {
    this.activeIndex.update(idx => (idx <= 0 ? this.maxIndex : idx - 1));
  }

  goTo(idx: number) {
    const clamped = Math.min(Math.max(0, idx), this.maxIndex);
    this.activeIndex.set(clamped);
  }

  navigateToBuild(card: ProjectCard, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.router.navigate(['/work'], { fragment: card.targetId || 'project-grid' });
  }
}
