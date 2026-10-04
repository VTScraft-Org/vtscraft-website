import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

interface Project {
  id: string;
  title: string;
  category: string; // for filtering
  tags: string[];
  description: string;
  image: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  private route = inject(ActivatedRoute);
  categories = [
    'All',
    'AI Automation',
    'CRM/ERP',
    'Software Dev',
    'Cybersecurity',
    'UI/UX Design'
  ];

  activeCategory = signal('All');

  projects: Project[] = [
    {
      id: 'lylux-crm',
      title: 'Lylux Custom CRM',
      category: 'CRM/ERP',
      tags: ['CRM/ERP', 'Software Development'],
      description: 'A custom desktop and web CRM replacing fragmented client tracking for a UAE luxury lighting distributor.',
      image: '/images/work/crm-app.png'
    },
    {
      id: 'secure-thread-vms',
      title: 'SecureThread OPS - VMS',
      category: 'Cybersecurity',
      tags: ['Cybersecurity', 'Software Development'],
      description: 'An automated vulnerability management system built to detect, prioritize, and manage security risks at enterprise scale.',
      image: '/images/work/vms-platform.png'
    },
    {
      id: 'trendz-rental-ms',
      title: 'Early Access - Rental MS',
      category: 'CRM/ERP',
      tags: ['CRM/ERP', 'Software Development'],
      description: 'A flexible rental management platform built to streamline inventory, bookings, and financial ledgers.',
      image: '/images/work/rental-ms.png'
    },
    {
      id: 'sales-outreach-agent',
      title: 'Sales Outreach Agent',
      category: 'AI Automation',
      tags: ['AI Automation', 'LLM Workflow'],
      description: 'Autonomous multi-agent system automating prospect discovery, company enrichment, and personalized omnichannel conversations.',
      image: '/images/work/sales-agent.png'
    },
    {
      id: 'aura-design-system',
      title: 'Aura Design System & UI Kit',
      category: 'UI/UX Design',
      tags: ['UI/UX Design', 'Design Tokens'],
      description: 'Unified cross-platform design token system with WCAG AAA accessibility, custom typography, and high-fidelity motion libraries.',
      image: '/images/work/crm-app.png'
    },
    {
      id: 'finnova-client-portal',
      title: 'FinNova Wealth Portal',
      category: 'Software Dev',
      tags: ['Software Dev', 'Fintech'],
      description: 'High-security client portal delivering sub-second portfolio analytics, encrypted document vaults, and biometric session governance.',
      image: '/images/work/vms-platform.png'
    }
  ];

  filteredProjects() {
    const cat = this.activeCategory();
    if (cat === 'All') return this.projects;
    if (cat === 'Software Dev') {
      return this.projects.filter(p => p.tags.includes('Software Development') || p.tags.includes('Software Dev'));
    }
    return this.projects.filter(p => p.category === cat || p.tags.includes(cat));
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToTarget(fragment);
        }, 150);
      }
    });
  }

  scrollToTarget(targetId: string) {
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToBuilds(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.scrollToTarget('project-grid');
  }
}
