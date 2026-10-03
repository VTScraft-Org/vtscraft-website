import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  metrics: string;
  visualType: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 'ai-llm',
      number: '01',
      tag: 'AGENTIC WORKFLOWS',
      title: 'AI & LLM Automation',
      description: 'We build private enterprise retrieval architectures, autonomous tool-calling agents, and document extraction engines that eradicate manual data entry and unlock proprietary organizational knowledge.',
      bullets: [
        'Custom RAG pipelines with hybrid vector & keyword search',
        'Autonomous task-execution agent swarms with human-in-the-loop oversight',
        'Local / self-hosted open-weights LLM deployment (zero data leakage)',
        'Automated document ingestion, entity extraction, and CRM sync'
      ],
      metrics: '85% Reduction in manual document triage',
      visualType: 'ai'
    },
    {
      id: 'software-dev',
      number: '02',
      tag: 'ENTERPRISE SYSTEMS',
      title: 'Software Development',
      description: 'End-to-end engineering of resilient web platforms, cloud microservices, and distributed API backbones built to withstand high concurrency and rigorous enterprise compliance.',
      bullets: [
        'Modern reactive frontend applications (Angular, React, Next.js)',
        'High-performance backend microservices (Node.js, Go, Python)',
        'Database architecture, query optimization, and sharding strategies',
        'Continuous delivery automation with automated security testing'
      ],
      metrics: 'Sub-50ms median API latency at scale',
      visualType: 'software'
    },
    {
      id: 'mobile-app',
      number: '03',
      tag: 'IOS & ANDROID',
      title: 'Mobile App Development',
      description: 'Smooth, responsive native and cross-platform applications engineered for flawless offline capability, encrypted biometric storage, and engaging 60fps animations.',
      bullets: [
        'Cross-platform Flutter & React Native development',
        'Offline-first synchronization with conflict resolution engines',
        'Biometric authentication, secure enclave keychain storage',
        'Automated App Store & Google Play distribution pipelines'
      ],
      metrics: '99.9% Crash-free session rate guaranteed',
      visualType: 'mobile'
    },
    {
      id: 'crm-erp',
      number: '04',
      tag: 'OPERATIONAL BACKBONE',
      title: 'CRM/ERP Solutions',
      description: 'Custom operational engines that replace fragmented spreadsheets and expensive rigid SaaS with systems mapped precisely to your quotation, dispatch, and accounting workflows.',
      bullets: [
        'Lead pipeline allocation with automated rep notification triggers',
        'Multi-currency invoicing, VAT calculation, and payment reconciliation',
        'Real-time multi-warehouse inventory tracking and low-stock alerts',
        'Granular role-based access control (RBAC) and audit logging'
      ],
      metrics: 'Zero spreadsheet workarounds required',
      visualType: 'crm'
    },
    {
      id: 'design-creative',
      number: '05',
      tag: 'PRODUCT & BRAND',
      title: 'Design & Creative',
      description: 'Intuitive user experiences, comprehensive design systems, and distinctive digital branding that elevate your software from functional to indispensable.',
      bullets: [
        'End-to-end UX research, customer journey mapping, and wireframing',
        'Scalable Figma component design systems with coded token mirrors',
        'Micro-interaction design and motion design for engaging apps',
        'WCAG 2.1 AA/AAA accessibility compliance auditing'
      ],
      metrics: '4x Faster engineering handoff via token systems',
      visualType: 'design'
    }
  ];
}
