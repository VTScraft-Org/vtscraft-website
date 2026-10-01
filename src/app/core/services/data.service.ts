import { Injectable } from '@angular/core';
import { ServiceItem } from '../../models/service.model';
import { ProjectItem } from '../../models/project.model';
import { FounderProfile } from '../../models/founder.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly services: ServiceItem[] = [
    {
      id: 'mobile-apps',
      title: 'Mobile App Development',
      subtitle: 'Native iOS & Android + Cross-Platform',
      description: 'High-performance mobile products shaped around your core user flows. We engineer fluid animations, offline sync, robust biometric security, and battery-friendly background pipelines.',
      iconName: 'mobile',
      category: 'core',
      colorTheme: 'blue',
      badge: 'Flagship Mobility',
      features: [
        'Native Swift (iOS) & Kotlin (Android) apps',
        'Cross-platform Flutter & React Native architectures',
        'Zero-latency offline synchronization and local caching',
        'Secure payment gateways, biometrics & push notifications',
        'Automated CI/CD pipelines directly to App Store & Google Play'
      ],
      techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite']
    },
    {
      id: 'websites',
      title: 'Modern Web Engineering',
      subtitle: 'Scalable Frontends, PWAs & Portals',
      description: 'Ultra-fast web platforms engineered with modern frameworks, high-conversion user journeys, top-tier Core Web Vitals, and edge caching for sub-second global response.',
      iconName: 'website',
      category: 'core',
      colorTheme: 'green',
      badge: 'Speed & Conversion',
      features: [
        'Enterprise Angular, Next.js & React architectures',
        'Progressive Web Apps (PWA) with offline capabilities',
        'Mobile-first responsive layouts for all viewport sizes',
        'Full SEO schema markup & 95+ Google Lighthouse scores',
        'Headless CMS integrations and serverless cloud deployment'
      ],
      techStack: ['Angular', 'TypeScript', 'Next.js', 'SCSS', 'Node.js', 'Vercel / Cloudflare']
    },
    {
      id: 'admin-panels',
      title: 'Admin Panels & Dashboards',
      subtitle: 'Real-Time Enterprise Operational Hubs',
      description: 'Transform fragmented spreadsheets and manual chaos into unified, real-time command consoles with granular role-based access control (RBAC), live telemetry, and business intelligence.',
      iconName: 'admin',
      category: 'core',
      colorTheme: 'azure',
      badge: 'Operational Telemetry',
      features: [
        'Granular Role-Based Access Control (RBAC) & user permissions',
        'Live streaming analytics, interactive charts & KPI monitors',
        'Automated scheduled report generation (CSV, PDF, Excel)',
        'Audit logging, compliance tracking, and activity monitoring',
        'Seamless integration with third-party ERPs and CRM APIs'
      ],
      techStack: ['Angular', 'Chart.js / D3.js', 'REST / GraphQL', 'PostgreSQL', 'Docker']
    },
    {
      id: 'custom-software',
      title: 'Custom Software & APIs',
      subtitle: 'Bespoke Backend Architectures',
      description: 'Custom-tailored software systems that match the exact mechanics of your business. No forced workarounds or unused bloated features — just resilient, scalable software engineered to last.',
      iconName: 'software',
      category: 'core',
      colorTheme: 'gradient',
      badge: 'Enterprise Architecture',
      features: [
        'Microservices and resilient REST / gRPC API backends',
        'High-concurrency database architecture & performance tuning',
        'Automated workflow engines replacing manual operations',
        'Cloud infrastructure automation (Docker, Kubernetes, AWS)',
        'Enterprise security standards, SOC2 readiness & data encryption'
      ],
      techStack: ['Node.js', 'Python', 'Go', 'AWS / Azure', 'Docker', 'PostgreSQL', 'Redis']
    },
    {
      id: 'cloud-devops',
      title: 'Cloud Architecture & DevOps',
      subtitle: 'Reliable, Automated Infrastructure',
      description: 'Zero-downtime deployment pipelines, infrastructure as code, container orchestration, and continuous security monitoring ensuring your systems never go dark.',
      iconName: 'cloud',
      category: 'extended',
      colorTheme: 'blue',
      badge: '99.9% Uptime',
      features: [
        'AWS, Azure, and Google Cloud platform architecture',
        'Automated CI/CD pipelines (GitHub Actions, GitLab)',
        'Docker containerization & Kubernetes cluster management',
        'Automated database backups, failover & disaster recovery'
      ],
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
    },
    {
      id: 'design-creative',
      title: 'UI/UX Design Systems',
      subtitle: 'User-Obsessed Product Design',
      description: 'Intuitive, aesthetically stunning user interfaces backed by deep behavioral UX research, interactive design systems, and rapid prototyping.',
      iconName: 'design',
      category: 'extended',
      colorTheme: 'green',
      badge: 'Pixel Precision',
      features: [
        'Complete design systems and Figma component libraries',
        'High-fidelity interactive prototypes & user testing',
        'Accessible, inclusive UI compliant with WCAG standards',
        'Seamless developer handoff with design tokens'
      ],
      techStack: ['Figma', 'Design Tokens', 'Storybook', 'Prototyping']
    }
  ];

  readonly projects: ProjectItem[] = [
    {
      id: 'custom-crm',
      category: 'Admin Panels & CRM',
      title: 'Custom Enterprise Operations CRM',
      tagline: 'Connecting end-to-end sales, inventory, and automated fulfillment',
      description: 'A bespoke CRM connecting one client’s international business end-to-end, replacing 8 separate SaaS subscriptions with one tailored, high-speed system.',
      problem: 'Off-the-shelf CRM charged exorbitant seat licenses while failing to support specialized manufacturing workflow stages.',
      solution: 'Engineered a unified Angular + Node.js administration suite featuring custom quote builders, RBAC, and live production telemetry.',
      results: [
        'Replaced 8 disjointed tools with 1 unified dashboard',
        'Reduced quote turnaround time by 68%',
        'Saved over $35,000 annually in SaaS subscription fees'
      ],
      techStack: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind SCSS'],
      image: 'images/showcase-banner.jpg',
      clientType: 'Manufacturing & Distribution',
      region: 'India & Middle East'
    },
    {
      id: 'vms-security',
      category: 'Custom Software',
      title: 'VMS Telemetry & Security Hub',
      tagline: 'Real-time cybersecurity controls & device monitoring platform',
      description: 'Enterprise security management platform monitoring over 15,000 connected network nodes with sub-second alerting and automated threat isolation.',
      problem: 'Existing commercial software lagged under heavy concurrency and lacked customized threat tagging for local network configurations.',
      solution: 'Architected high-throughput microservices handling streaming WebSockets data with interactive real-time visual mapping.',
      results: [
        'Sub-second incident alerting across 15k+ endpoints',
        '99.99% operational uptime maintained through 18 months',
        'Zero data packet drops during traffic surges'
      ],
      techStack: ['Angular', 'Go', 'WebSockets', 'Redis', 'Docker'],
      image: 'images/showcase-banner.jpg',
      clientType: 'Cybersecurity Firm',
      region: 'United States'
    },
    {
      id: 'logistics-rental',
      category: 'Websites & Portals',
      title: 'Multi-Tenant Equipment Rental Portal',
      tagline: 'Automated booking, digital contracts, and live asset tracking',
      description: 'A customer-facing web booking engine coupled with an intelligent dispatcher console for commercial equipment fleets.',
      problem: 'Manual telephone reservations and paper invoices resulted in frequent double-bookings and delayed billing cycles.',
      solution: 'Created an intuitive PWA customer portal integrated with real-time GPS asset availability, digital e-signatures, and instant stripe billing.',
      results: [
        'Booking throughput increased by 210% within 90 days',
        '100% elimination of double-booking incidents',
        'Instant digital contract signing reduced admin time by 15 hrs/week'
      ],
      techStack: ['Angular', 'Node.js', 'Stripe API', 'Google Maps API', 'AWS'],
      image: 'images/showcase-banner.jpg',
      clientType: 'Logistics & Fleet Operator',
      region: 'United Kingdom'
    },
    {
      id: 'fintech-mobility',
      category: 'Mobile Apps',
      title: 'Cross-Platform Neo-Banking Mobile App',
      tagline: 'Frictionless peer-to-peer transfers, virtual cards & spending insights',
      description: 'Secure, high-speed mobile banking application designed for Gen-Z and millennial users with biometric security and sub-second transfers.',
      problem: 'Legacy mobile app suffered from 4.2% crash rate and confusing 6-step transaction flows.',
      solution: 'Re-built using Flutter with clean MVVM architecture, biometric instant checkout, and encrypted tokenization.',
      results: [
        'Crash-free rate boosted to 99.9%',
        'App store rating jumped from 3.2 to 4.8 stars',
        'Active monthly user engagement increased by 84%'
      ],
      techStack: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'RESTful Security APIs'],
      image: 'images/showcase-banner.jpg',
      clientType: 'FinTech Startup',
      region: 'India'
    }
  ];

  readonly painPoints = [
    {
      title: 'Built for the average company, not for you',
      desc: 'Off-the-shelf software forces your team to bend your unique workflows around generic software limitations, leading to workarounds and spreadsheet chaos.',
      ourAnswer: 'At VTS Craft, every system is designed around the exact mechanics of how your business operates, eliminating unnecessary friction.'
    },
    {
      title: 'Scope that shifts, pricing that surprises',
      desc: 'Most software agencies lure you in with a low estimate, only to bombard you with change-orders and surprise invoices for basic requirements.',
      ourAnswer: 'We establish fixed milestone pricing and transparent technical scope before you commit. What you see is what you pay.'
    },
    {
      title: 'Surface automation that skips the bottleneck',
      desc: 'Bolt-on plugins and quick-fix automations often break whenever APIs change, creating more maintenance headaches than they solve.',
      ourAnswer: 'We build resilient, deep backend integrations that handle edge cases gracefully, logging every action with complete audit trails.'
    },
    {
      title: 'Support that vanishes the moment code goes live',
      desc: 'Agencies celebrate launch day and immediately disappear onto their next contract, leaving you stranded when real users report bugs.',
      ourAnswer: 'We stay in the room. Our team provides dedicated post-launch support, continuous monitoring, and iterative feature development.'
    }
  ];

  readonly whyChooseUs = [
    {
      title: 'You own 100% of everything you pay for',
      desc: 'Full intellectual property rights from day one. You get complete access to Git repositories, architecture diagrams, and documentation with zero vendor lock-in.',
      icon: 'shield'
    },
    {
      title: 'Direct line to the engineers building it',
      desc: 'No layers of non-technical account managers playing telephone. You speak directly with senior architects and developers who understand the code.',
      icon: 'users'
    },
    {
      title: 'Whatever stack fits, not whatever we default to',
      desc: 'We don’t force every problem into a cookie-cutter template. Whether Angular, Flutter, Node, or Go, we pick the best tool for performance and scale.',
      icon: 'code'
    },
    {
      title: 'Intelligence where it earns its place, not hype',
      desc: 'We integrate automation and AI where it genuinely saves hours and boosts throughput — not as meaningless marketing buzzwords.',
      icon: 'cpu'
    }
  ];

  readonly processSteps = [
    {
      number: '01',
      title: 'A Conversation, Not a Pitch',
      desc: 'We sit down to understand your business model, current bottlenecks, and core objectives. No aggressive sales pitches — just technical clarity.'
    },
    {
      number: '02',
      title: 'Fixed Scope & Milestone Roadmap',
      desc: 'Before any code is written, you receive a detailed blueprint, user flow architecture, and transparent milestone pricing.'
    },
    {
      number: '03',
      title: 'Custom Engineering Sprints',
      desc: 'We build in two-week agile sprints. You receive staging links and progress demonstrations at every step, allowing continuous feedback.'
    },
    {
      number: '04',
      title: 'Launch, Monitor & Stay On',
      desc: 'We manage deployment to production cloud environments, monitor telemetry, and remain your long-term technology partner.'
    }
  ];

  readonly faqs = [
    {
      q: 'Do we own the source code and intellectual property?',
      a: 'Yes, 100%. Upon milestone completion, full ownership of all source code, design assets, and database schemas belongs exclusively to your company.'
    },
    {
      q: 'How does project pricing and billing work?',
      a: 'We offer transparent, fixed-scope milestone billing as well as dedicated monthly squad engagements. You will never encounter unexpected hidden fees.'
    },
    {
      q: 'Can you work with our existing codebase or API?',
      a: 'Absolutely. We frequently audit, refactor, and modernize legacy systems, as well as build custom frontend portals or mobile apps on top of existing backends.'
    },
    {
      q: 'What does post-launch support include?',
      a: 'Our post-launch retainers include active uptime monitoring, bug remediation, security patches, framework updates, and continuous feature iterations.'
    },
    {
      q: 'How do we communicate throughout the project?',
      a: 'We communicate via dedicated Slack/Teams channels, weekly video sprint reviews, and direct issue tracking on Jira/GitHub for total transparency.'
    }
  ];

  readonly founder: FounderProfile = {
    name: 'Founder & Tech Visionary',
    role: 'Founder & Chief Technology Officer',
    companyTag: 'VTS Craft',
    headline: 'Crafting Next-Generation Digital Products with Engineering Rigor',
    bio: [
      'Driven by an unwavering passion for technological craftsmanship, I founded VTS Craft to empower enterprises and visionary founders with world-class software engineering.',
      'From agile mobile architectures to mission-critical enterprise admin panels, our team delivers high-performing, resilient digital products with complete transparency and dedication from India to the world.'
    ],
    quote: 'True digital excellence happens at the intersection of aesthetic design, solid architecture, and genuine client empathy.',
    image: '',
    expertise: [
      'Full-Stack Architecture',
      'Mobile & Web Strategy',
      'Enterprise Scalability',
      'Cloud & Microservices'
    ],
    stats: [
      { value: '100%', label: 'Commitment to Quality' },
      { value: 'Direct', label: 'Engineer Access' },
      { value: 'Agile', label: 'Sprint Methodology' }
    ],
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
      { platform: 'twitter', url: 'https://twitter.com', label: 'Twitter / X' },
      { platform: 'github', url: 'https://github.com', label: 'GitHub' },
      { platform: 'email', url: 'mailto:contact@vtscraft.com', label: 'Email' }
    ]
  };

  readonly scaleMetrics = [
    { value: '50+', label: 'Projects Delivered', desc: 'Across manufacturing, healthcare, fintech & logistics.' },
    { value: '30+', label: 'Clients Served', desc: 'From first-time founders to established global enterprises.' },
    { value: '12+', label: 'Countries Reached', desc: 'India, U.S.A, U.K, U.A.E, Singapore, Australia and more.' }
  ];

  readonly clientLogos = [
    'TechNova Systems',
    'Apex Logistics',
    'InnoHealth Digital',
    'Nexus FinTech',
    'Krypton Security',
    'Vanguard Retail',
    'OmniFleet India',
    'Horizon Cloud'
  ];
}
