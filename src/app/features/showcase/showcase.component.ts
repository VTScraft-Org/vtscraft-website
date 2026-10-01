import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {
  activeTab = signal<'admin' | 'mobile' | 'website'>('admin');

  showcases: Record<'admin' | 'mobile' | 'website', ShowcaseItem> = {
    admin: {
      id: 'admin',
      category: 'Admin Panels & Dashboards',
      title: 'Enterprise Analytics & Operations Hub',
      tagline: 'Real-time telemetry, automated reporting, and role-based permissions',
      description: 'Custom admin consoles designed for high-throughput data processing, executive business intelligence, order lifecycle management, and user auditing.',
      highlights: [
        'Live streaming metrics and customizable KPI widgets',
        'Granular role-based access control (RBAC)',
        'Automated scheduled report exports (CSV, PDF, Excel)',
        'Sub-second query response with optimized database indexing'
      ],
      metrics: [
        { label: 'Query Latency', value: '< 120ms' },
        { label: 'Data Accuracy', value: '99.99%' },
        { label: 'Daily Events Handled', value: '10M+' }
      ]
    },
    mobile: {
      id: 'mobile',
      category: 'Mobile Applications',
      title: 'Intuitive iOS & Android Mobile Ecosystems',
      tagline: 'Pixel-perfect, fluid micro-interactions, and instant responsiveness',
      description: 'Cross-platform and native mobile apps built with clean MVVM/Clean Architecture, resilient offline state synchronization, and battery-friendly background tasks.',
      highlights: [
        'Smooth 60fps animations and native gesture handling',
        'Zero-latency offline mode with SQLite/WatermelonDB sync',
        'Secure biometric authentication (FaceID / Fingerprint)',
        'Push notification pipelines with Firebase and APNs'
      ],
      metrics: [
        { label: 'Crash-Free Rate', value: '99.8%' },
        { label: 'Cold App Launch', value: '< 1.1s' },
        { label: 'Store Rating Avg', value: '4.8 ★' }
      ]
    },
    website: {
      id: 'website',
      category: 'High-Performance Websites',
      title: 'Modern Web Platforms & Corporate Portals',
      tagline: 'Blazing speed, maximum search visibility, and frictionless UX',
      description: 'Progressive Web Apps and server-rendered portals engineered for peak performance scores, accessible responsive design, and frictionless customer conversion.',
      highlights: [
        'Lighthouse performance score 95+ out of the box',
        'Fluid adaptation across mobile, tablet, and ultra-wide screens',
        'Edge caching and CDN delivery for sub-second page loads',
        'Structured schema markup for peak Google SEO ranking'
      ],
      metrics: [
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'TTFB (Global CDN)', value: '< 80ms' },
        { label: 'Conversion Lift', value: '+42%' }
      ]
    }
  };

  selectTab(tab: 'admin' | 'mobile' | 'website'): void {
    this.activeTab.set(tab);
  }
}
