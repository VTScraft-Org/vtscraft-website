import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem } from '../../models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 'mobile-apps',
      title: 'Mobile Apps',
      subtitle: 'Native & Cross-Platform Mobility',
      description: 'Engineered for seamless user journeys, blazing speed, and offline resilience across both iOS and Android ecosystems.',
      iconName: 'mobile',
      category: 'core',
      colorTheme: 'blue',
      badge: 'Flagship Service',
      features: [
        'iOS (Swift) & Android (Kotlin)',
        'Cross-platform Flutter & React Native',
        'Offline sync & local caching',
        'Biometrics, Push & In-App Purchases'
      ],
      techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase']
    },
    {
      id: 'websites',
      title: 'Websites & Web Apps',
      subtitle: 'Modern, High-Conversion Frontends',
      description: 'Ultra-fast web architectures engineered with modern frameworks, robust SEO, fluid responsiveness, and top-tier core web vitals.',
      iconName: 'website',
      category: 'core',
      colorTheme: 'green',
      badge: 'High Performance',
      features: [
        'Single-Page & Progressive Web Apps (PWA)',
        'Enterprise Angular, Next.js & React',
        'SEO-optimized, mobile-first design',
        'Headless CMS & API integrations'
      ],
      techStack: ['Angular', 'Next.js', 'TypeScript', 'Tailwind/SCSS', 'Node.js']
    },
    {
      id: 'admin-panels',
      title: 'Admin Panels & Portals',
      subtitle: 'Real-Time Enterprise Dashboards',
      description: 'Empower your teams with mission-critical administrative hubs, custom business analytics, RBAC security, and automated workflows.',
      iconName: 'admin',
      category: 'core',
      colorTheme: 'azure',
      badge: 'Operational Hubs',
      features: [
        'Role-Based Access Control (RBAC)',
        'Live data visualization & charting',
        'Audit logs, export pipelines (CSV/PDF)',
        'Multi-tenant enterprise structure'
      ],
      techStack: ['Angular', 'Chart.js / D3', 'REST / GraphQL', 'PostgreSQL', 'Docker']
    },
    {
      id: 'custom-software',
      title: 'Custom Software',
      subtitle: 'Bespoke Enterprise Systems',
      description: 'Tailored backend systems, microservices, cloud pipelines, and automated business workflows built to solve your unique operational bottlenecks.',
      iconName: 'software',
      category: 'core',
      colorTheme: 'gradient',
      badge: 'Scalable Architecture',
      features: [
        'Microservices & resilient REST/gRPC APIs',
        'Database optimization & cloud migrations',
        'Third-party ERP, CRM & payment bridges',
        'Enterprise security & GDPR compliance'
      ],
      techStack: ['Node.js', 'Python', 'Go', 'AWS / Azure', 'Docker / K8s']
    }
  ];
}
