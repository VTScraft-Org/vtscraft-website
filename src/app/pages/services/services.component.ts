import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ServiceProcess {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  tag: string;
  title: string;
  whatItIs: string;
  description: string;
  subservices: string[];
  deliverables: string[];
  process: ServiceProcess[];
  metrics: string;
  visualType: string;
  imagePath?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  activeTab: { [key: string]: 'overview' | 'process' | 'deliverables' } = {};

  getTab(id: string): 'overview' | 'process' | 'deliverables' {
    return this.activeTab[id] || 'overview';
  }

  setTab(id: string, tab: 'overview' | 'process' | 'deliverables') {
    this.activeTab[id] = tab;
  }

  services: ServiceCategory[] = [
    {
      id: 'web-dev',
      number: '01',
      tag: 'WEB & DIGITAL PLATFORMS',
      title: 'Web Development',
      whatItIs: `Most websites don't fail because of bad design. They fail before a pixel is placed.\n\nA vague business goal, a bloated feature wishlist, a template chosen because it "looked nice" — and a launch plan that ends at going live. These are what turn a promising product into a slow, unmaintained page nobody returns to after the first visit.\n\nWe start by establishing what the site actually needs to accomplish and for whom. Architecture, performance targets, SEO foundations, and content strategy all get mapped before a single component is built. Launching is not the finish line — it's where user trust begins.`,
      description: 'High-performance, secure web applications, bespoke e-commerce engines, and high-conversion landing sites engineered for sub-second speeds and flawless responsiveness.',
      subservices: [
        'Business Websites',
        'E-commerce Websites',
        'Web Applications',
        'Landing Pages',
        'Custom Web Solutions'
      ],
      deliverables: [
        'Complete source code with documentation',
        'Performance audit report (Core Web Vitals)',
        'SEO foundation & sitemap',
        'CMS integration & admin training',
        '3-month post-launch support',
        'Staging & production deployment'
      ],
      process: [
        { step: '01', title: 'Discovery & Architecture', detail: 'We audit your business goals, user personas, and technical constraints before touching a line of code.' },
        { step: '02', title: 'Design System & Wireframes', detail: 'Component-first design with your brand tokens. Every screen approved before development begins.' },
        { step: '03', title: 'Agile Build Sprints', detail: '2-week delivery cycles with working demos. You see real progress, not just status updates.' },
        { step: '04', title: 'QA, Performance & Launch', detail: 'Cross-browser testing, Lighthouse optimization, and zero-downtime production deployment.' }
      ],
      metrics: 'Sub-second load speeds & 100/100 Lighthouse performance',
      visualType: 'web',
      imagePath: '/assets/service-web-dev.jpg'
    },
    {
      id: 'mobile-app',
      number: '02',
      tag: 'iOS & ANDROID ECOSYSTEMS',
      title: 'Mobile App Development',
      whatItIs: `Most apps don't fail because of bad code. They fail before a line is written.\n\nA vague business goal, an inflated feature list, a platform choice made on gut feeling, and a launch plan that stops at the app store submission — these are what turn a promising product into an expensive icon nobody opens after the first week.\n\nWe start by establishing what the app actually needs to do and for whom. Platform choice, backend architecture, third-party integrations, and the post-launch reality all get mapped before a single screen is designed. Launching is not the finish line. It's where the real work begins.`,
      description: 'Native and cross-platform mobile apps built with 60 FPS smooth animations, secure offline persistence, biometric encryption, and streamlined app store compliance.',
      subservices: [
        'Android Applications',
        'iOS Applications',
        'Cross-Platform Apps (Flutter & React Native)',
        'Business & Utility Apps',
        'App Maintenance & Version Governance'
      ],
      deliverables: [
        'Native or cross-platform source code',
        'App Store & Play Store submission',
        'Backend API with admin dashboard',
        'Push notification infrastructure',
        'Analytics & crash reporting setup',
        'Post-launch monitoring (90 days)'
      ],
      process: [
        { step: '01', title: 'Product Strategy Session', detail: 'Platform selection, feature scoping, and user journey mapping. No assumptions.' },
        { step: '02', title: 'Prototyping & User Testing', detail: 'Interactive prototype validated with real users before engineering begins.' },
        { step: '03', title: 'Sprint-Based Development', detail: 'Bi-weekly working builds. Each sprint ships real, testable features.' },
        { step: '04', title: 'Store Submission & Handover', detail: 'Full compliance review, store listing optimization, and team knowledge transfer.' }
      ],
      metrics: '99.9% Crash-free session stability guaranteed',
      visualType: 'mobile',
      imagePath: '/assets/service-mobile-app.jpg'
    },
    {
      id: 'cloud-services',
      number: '03',
      tag: 'CLOUD ARCHITECTURE & DEVOPS',
      title: 'Cloud Services',
      whatItIs: `Most cloud migrations don't fail because of the technology. They fail because nobody asked the right questions upfront.\n\nWhich workloads actually benefit from cloud? What does your team know how to operate? What happens when costs spiral 3x past projections in month two? An architecture chosen for hype rather than your specific traffic patterns and budget realities is an architecture that will cost you twice — once to build and once to fix.\n\nWe start with your existing infrastructure, your team's skill set, and your real business SLAs. Then we design and operate cloud infrastructure that is boring in the best possible way: reliable, cost-predictable, and maintainable.`,
      description: 'Enterprise cloud migration, multi-region Kubernetes clusters, automated zero-downtime CI/CD pipelines, and proactive infrastructure cost optimization.',
      subservices: [
        'Cloud Migration (AWS, GCP, Azure)',
        'Cloud Deployment & IaC (Terraform)',
        'Kubernetes & Container Orchestration',
        'Cloud Cost & Performance Optimization',
        '24/7 Cloud Monitoring & Incident Management'
      ],
      deliverables: [
        'Infrastructure-as-Code repository (Terraform)',
        'CI/CD pipeline configuration',
        'Runbook & incident response playbook',
        'Cost optimization report',
        'Monitoring dashboards (Grafana/Datadog)',
        'Security hardening audit'
      ],
      process: [
        { step: '01', title: 'Infrastructure Audit', detail: 'Full assessment of current stack, pain points, and migration risk profile.' },
        { step: '02', title: 'Architecture Blueprint', detail: 'Designed for your actual scale — not for a fictional 10M users scenario.' },
        { step: '03', title: 'Phased Migration', detail: 'Zero-downtime cutover with staged rollback plan at every checkpoint.' },
        { step: '04', title: 'Operations Handover', detail: 'Full runbook, alerting rules, and optional managed operations SLA.' }
      ],
      metrics: '99.99% Infrastructure uptime & zero-downtime releases',
      visualType: 'cloud',
      imagePath: '/assets/service-cloud.jpg'
    },
    {
      id: 'ai-genai',
      number: '04',
      tag: 'AGENTIC AI & NEURAL SYSTEMS',
      title: 'AI & Generative AI',
      whatItIs: `Most AI projects don't fail because the model is wrong. They fail because nobody scoped the problem correctly.\n\nA chatbot bolted onto a website, an LLM API key in production with no guardrails, and a demo that impressed the board but collapses on real data — these are what turn genuine AI potential into expensive IT experiments that get quietly shelved.\n\nWe start by understanding whether AI is actually the right tool for your problem. Then we design systems with data privacy, output reliability, and human-in-the-loop controls built in from day one — not retrofitted after the first incident.`,
      description: 'Production-ready generative AI solutions, self-hosted open-weights LLMs, private retrieval-augmented generation (RAG), and autonomous multi-agent pipelines.',
      subservices: [
        'AI-Powered Enterprise Applications',
        'Generative AI Solutions & Fine-Tuning',
        'Autonomous AI Agents & Swarms',
        'RAG Applications with Hybrid Vector Search',
        'End-to-End AI Automation'
      ],
      deliverables: [
        'Production AI application with full API',
        'Vector database & embedding pipeline',
        'Prompt engineering & evaluation suite',
        'Model monitoring & drift detection',
        'Data governance documentation',
        'Inference cost optimization report'
      ],
      process: [
        { step: '01', title: 'AI Feasibility Assessment', detail: 'We validate whether AI is the right solution before committing engineering resources.' },
        { step: '02', title: 'Data & Model Strategy', detail: 'Data quality audit, model selection, and privacy architecture defined upfront.' },
        { step: '03', title: 'Prototype & Evaluation', detail: 'Working prototype with measurable accuracy benchmarks before full build.' },
        { step: '04', title: 'Production Hardening', detail: 'Guardrails, monitoring, fallback logic, and human review workflows implemented.' }
      ],
      metrics: '85% Reduction in manual document triage & reasoning tasks',
      visualType: 'ai'
    },
    {
      id: 'conversational-ai',
      number: '05',
      tag: 'VOICE & CHAT AGENTS',
      title: 'Conversational AI',
      whatItIs: `Most chatbots don't fail because of the AI behind them. They fail because they were designed to handle ideal conversations only.\n\nA bot that breaks on the first unusual phrasing, escalates every third message to a human, and forgets the context from two sentences ago — this is what your customers experience when conversational AI is built as a feature rather than a product.\n\nWe design conversational systems around the worst-case user interaction, not the best case. That means robust intent handling, graceful fallbacks, tone-consistent responses, and clear escalation paths that make the human handoff feel intentional rather than like a failure.`,
      description: 'Intelligent multi-lingual voice assistants, contextual customer support chatbots, and automated telephony IVRs that handle inquiries with natural human fluency.',
      subservices: [
        'AI Chatbots with CRM Integration',
        'Real-time Voice Assistants & Speech Synthesis',
        'Conversational Applications',
        'Intelligent IVR Telephony Automation',
        '24/7 Tier-1 Customer Support Automation'
      ],
      deliverables: [
        'Conversational AI application (web/mobile/voice)',
        'Intent taxonomy & training data',
        'CRM / helpdesk integration',
        'Analytics dashboard (resolution rate, CSAT)',
        'Fallback & escalation workflow',
        'A/B testing framework for dialogue'
      ],
      process: [
        { step: '01', title: 'Conversation Design', detail: 'We map every user intent, edge case, and escalation path before building anything.' },
        { step: '02', title: 'NLP Model & Integration', detail: 'Model selection, training data curation, and backend system connections.' },
        { step: '03', title: 'Pilot & Live Tuning', detail: 'Controlled rollout with real traffic, iterating on low-confidence interactions weekly.' },
        { step: '04', title: 'Scale & Monitor', detail: 'Full monitoring suite with ongoing dialogue optimization based on resolution data.' }
      ],
      metrics: 'Sub-400ms voice response latency & 90% resolution rate',
      visualType: 'chat'
    },
    {
      id: 'software-dev',
      number: '06',
      tag: 'ENTERPRISE SYSTEMS & SAAS',
      title: 'Software Development',
      whatItIs: `Most custom software projects don't fail because of bugs. They fail because scope was never properly constrained.\n\nA requirements document that keeps growing, an architecture chosen for theoretical flexibility that nobody on your team can maintain, and a delivery timeline that was optimistic at best, dishonest at worst — these are what turn a business-critical initiative into a multi-year, over-budget project that ships something nobody wanted.\n\nWe build software the way a principal engineer thinks about it: what is the smallest version that delivers real value, and what does the architecture need to support 18 months from now — without over-engineering for a future that may not arrive.`,
      description: 'Bespoke enterprise software, multi-tenant SaaS engines, distributed microservices, and secure API backbones engineered to handle high concurrency with ease.',
      subservices: [
        'Custom Business Software',
        'Multi-Tenant SaaS Applications',
        'High-Throughput Backend Development',
        'REST & GraphQL API Development',
        'Mission-Critical Enterprise Applications'
      ],
      deliverables: [
        'Full source code with architecture docs',
        'Automated test suite (unit + integration)',
        'API documentation (OpenAPI / Postman)',
        'Database schema & migration scripts',
        'Deployment scripts & CI/CD pipeline',
        'Technical handover & developer onboarding'
      ],
      process: [
        { step: '01', title: 'Scope & Architecture Review', detail: 'We challenge scope ruthlessly before committing. Scope creep is caught here, not in month 5.' },
        { step: '02', title: 'Technical Design & ADRs', detail: 'Architecture Decision Records written. Every major choice is documented and justified.' },
        { step: '03', title: 'Iterative Build & Code Review', detail: 'Senior engineers on every PR. No junior-only teams on enterprise builds.' },
        { step: '04', title: 'Delivery & Knowledge Transfer', detail: 'Your team owns the code on day one. Full documentation and pair-programming sessions.' }
      ],
      metrics: 'Sub-40ms median API latency under high concurrency',
      visualType: 'software'
    },
    {
      id: 'ui-ux-design',
      number: '07',
      tag: 'HUMAN-CENTERED DESIGN',
      title: 'UI/UX & Product Design',
      whatItIs: `Most design projects don't fail because the visuals were wrong. They fail because the design was never validated with real users.\n\nA beautiful interface that confuses first-time users, a dashboard that looks impressive in Figma but causes decision paralysis in production, a mobile app where 80% of the critical actions are buried three taps deep — this is what happens when design is treated as decoration rather than as product thinking made visible.\n\nWe design from user research, not assumptions. Every interaction is tested. Every screen serves a measurable business outcome. Beauty is a byproduct of clarity — not the starting point.`,
      description: 'Research-backed user experiences, scalable design token systems, rich micro-interactions, and conversion-focused web and mobile interfaces.',
      subservices: [
        'Website UI & Interaction Design',
        'Mobile App UI Design',
        'Complex Dashboard & Analytics Design',
        'UX Research & Customer Journey Mapping',
        'Enterprise Design Systems & Token Kits'
      ],
      deliverables: [
        'Figma design system with component library',
        'Responsive prototypes (all breakpoints)',
        'UX research report with findings',
        'Usability test recordings & heatmaps',
        'Developer handoff with token annotations',
        'WCAG AAA accessibility audit'
      ],
      process: [
        { step: '01', title: 'Research & Discovery', detail: 'User interviews, competitor analysis, and task flow mapping before any visual work.' },
        { step: '02', title: 'Information Architecture', detail: 'Sitemap, navigation structure, and content hierarchy defined with stakeholders.' },
        { step: '03', title: 'Iterative Design & Testing', detail: 'Low-fi → hi-fi → prototype. Tested with real users at each stage.' },
        { step: '04', title: 'Design System Handoff', detail: 'Complete design token system, component docs, and developer annotation specs.' }
      ],
      metrics: 'WCAG AAA accessibility compliance & 4x faster dev handoff',
      visualType: 'design'
    },
    {
      id: 'automation-integration',
      number: '08',
      tag: 'WORKFLOW & SYSTEM SYNC',
      title: 'Automation & Integration',
      whatItIs: `Most automation projects don't fail because the tools aren't capable. They fail because the underlying process was broken before it was automated.\n\nAutomating a broken workflow just means you break things faster. A Zapier chain that silently drops records under load, a webhook that has no retry logic and no monitoring, a CRM sync that was working fine until someone changed a field name — these are what pass for "automation" in most businesses.\n\nWe document the process before writing a single integration. We design for failure modes, not just happy paths. And we monitor every automated workflow so you know about problems before your customers do.`,
      description: 'Eliminate manual bottlenecks and data silos with reliable bidirectional API bridges, CRM synchronization, and automated enterprise business processes.',
      subservices: [
        'Business Process Automation (BPA)',
        'Custom API Integrations & Webhooks',
        'Third-Party SaaS Integrations',
        'CRM & ERP Live Integrations',
        'Event-Driven Workflow Automation'
      ],
      deliverables: [
        'Integration architecture diagram',
        'Webhook & event handler codebase',
        'Error handling & retry logic',
        'Dead-letter queue & alerting setup',
        'Data reconciliation scripts',
        'Integration monitoring dashboard'
      ],
      process: [
        { step: '01', title: 'Process Documentation', detail: 'We map the current manual process, including every exception case and failure mode.' },
        { step: '02', title: 'Integration Architecture', detail: 'API contracts, data transformation logic, and error handling designed upfront.' },
        { step: '03', title: 'Build & Sandbox Testing', detail: 'Full integration built and tested against staging environments of all connected systems.' },
        { step: '04', title: 'Live Monitoring Handover', detail: 'Alerting rules, runbook, and optional managed monitoring SLA.' }
      ],
      metrics: '100% Elimination of redundant cross-system data entry',
      visualType: 'automation'
    },
    {
      id: 'data-analytics',
      number: '09',
      tag: 'BUSINESS INTELLIGENCE',
      title: 'Data & Analytics',
      whatItIs: `Most data projects don't fail because the visualization was wrong. They fail because nobody agreed on what the numbers should mean.\n\nA dashboard that shows 14 metrics but doesn't help anyone make a decision, a report that contradicts the one from last quarter because the definition of "active user" changed silently, and a data warehouse that nobody trusts because the ETL pipeline has been wrong for three months without anyone noticing — this is what most "data strategies" look like in practice.\n\nWe start with the decisions your team needs to make and work backwards to the data required to make them well. Every metric is defined, agreed upon, and documented before a single chart is built.`,
      description: 'Transform raw data into real-time visual executive dashboards, automated reporting suites, optimized data pipelines, and predictive business intelligence.',
      subservices: [
        'Real-Time Business Dashboards',
        'High-Fidelity Data Visualization',
        'Automated Executive Reporting Solutions',
        'Database Optimization & Data Warehousing',
        'Predictive Business Intelligence (BI)'
      ],
      deliverables: [
        'Data warehouse / lake architecture',
        'ETL / ELT pipeline codebase',
        'Metric definitions document',
        'Executive dashboard (Grafana / Looker / custom)',
        'Automated report delivery system',
        'Data quality monitoring & alerting'
      ],
      process: [
        { step: '01', title: 'Decision Inventory', detail: 'We list every business decision that needs data and define success metrics upfront.' },
        { step: '02', title: 'Data Audit & Modeling', detail: 'Source system audit, data quality assessment, and warehouse schema design.' },
        { step: '03', title: 'Pipeline & Dashboard Build', detail: 'ETL pipelines with full test coverage and dashboard built to your approved spec.' },
        { step: '04', title: 'Training & Governance', detail: 'Team training, data dictionary, and governance playbook for ongoing ownership.' }
      ],
      metrics: 'Sub-second queries across multi-million row datasets',
      visualType: 'data'
    },
    {
      id: 'maintenance-support',
      number: '10',
      tag: 'SLA GUARANTEE & SECURITY',
      title: 'Maintenance & IT Support',
      whatItIs: `Most support contracts don't fail because of the team's capability. They fail because "support" was never properly defined.\n\nA retainer that covers bug fixes but not dependency updates, an SLA that promises a response time but not a resolution time, a monitoring setup that alerts on server downtime but misses the silent degradation that starts affecting users days earlier — this is what most maintenance agreements look like in practice.\n\nWe define support scope, SLA tiers, escalation paths, and on-call responsibilities in writing before the contract is signed. And we monitor proactively, so we're working on your problem before you even know it exists.`,
      description: 'Continuous proactive monitoring, scheduled security patches, rapid bug resolution, dependency updates, and continuous performance tuning.',
      subservices: [
        'Continuous Website & Application Maintenance',
        '24/7 Critical Application Support',
        'Rapid Bug Fixing & Root Cause Resolution',
        'Continuous Performance Optimization',
        'Security Auditing, Vulnerability Patches & Updates'
      ],
      deliverables: [
        'Signed SLA with defined response & resolution times',
        '24/7 uptime monitoring & alerting',
        'Monthly security patch reports',
        'Quarterly performance audit',
        'Incident postmortems with root cause analysis',
        'Dedicated Slack/Teams support channel'
      ],
      process: [
        { step: '01', title: 'System Onboarding Audit', detail: 'We review the full codebase, infrastructure, and existing monitoring before assuming responsibility.' },
        { step: '02', title: 'SLA & Scope Definition', detail: 'Every support tier, response time, and out-of-scope item is defined in writing.' },
        { step: '03', title: 'Monitoring & Alerting Setup', detail: 'Full observability stack with alerting calibrated to your actual risk tolerance.' },
        { step: '04', title: 'Ongoing Operations', detail: 'Monthly health reports, scheduled maintenance windows, and proactive vulnerability scanning.' }
      ],
      metrics: '<15 Minute critical incident SLA response time',
      visualType: 'support'
    }
  ];
}
