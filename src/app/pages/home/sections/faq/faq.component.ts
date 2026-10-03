import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  keyHighlight: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  activeId = signal<number>(1);

  faqs: FaqItem[] = [
    {
      id: 1,
      question: 'How much does custom software development cost?',
      answer: 'Our custom software projects typically range from $8,000 for focused MVPs and internal tools up to $45,000+ for enterprise platforms with deep AI integrations and complex distributed architectures. We provide milestone-based, fixed-cost quotes after an initial discovery session, so you never get hit with scope creep surprises.',
      keyHighlight: 'Milestone-based, fixed transparent quotes with zero hidden hourly fees.'
    },
    {
      id: 2,
      question: 'Can a small agency handle large scale projects?',
      answer: 'Yes. Unlike giant legacy consultancies that bill you for 10 layers of non-technical management, VTScraft assigns senior principal engineers directly to your codebase. We have architected fault-tolerant systems handling millions of monthly requests, high-throughput financial pipelines, and healthcare HIPAA-compliant workloads.',
      keyHighlight: 'Senior principal engineers only — high velocity, zero corporate bloat.'
    },
    {
      id: 3,
      question: 'Do I own the code after delivery?',
      answer: '100% yes. From the first commit to production deployment, you maintain full legal and intellectual property ownership of all Git repositories, infrastructure configuration files (Terraform/Docker), database schemas, and design files.',
      keyHighlight: 'Full IP and repository ownership transferred directly to your organization.'
    },
    {
      id: 4,
      question: 'Does VTScraft only build AI products?',
      answer: 'No. While AI and LLM workflows are a core specialty of ours, we build comprehensive digital systems: robust web applications, high-performance mobile apps, custom ERPs, and cloud architectures. We only integrate AI where it solves a real operational bottleneck.',
      keyHighlight: 'Full-stack engineering: Web, Mobile, ERP, and AI Automation.'
    },
    {
      id: 5,
      question: 'What happens after launch?',
      answer: 'We don\'t disappear after shipping. Every project includes a 30-day post-launch warranty period for bug fixes and performance tuning. Beyond that, most of our clients transition into an ongoing SLA retainer for continuous feature development and DevOps monitoring.',
      keyHighlight: '30-day post-launch warranty included, plus dedicated ongoing SLA retainers.'
    },
    {
      id: 6,
      question: 'How do you handle data security?',
      answer: 'Security is baked into our development lifecycle from day one. We adhere to OWASP top-10 standards, role-based access control (RBAC), end-to-end data encryption at rest and in transit, automated secret scanning in CI/CD, and compliance guidelines for SOC2, HIPAA, and GDPR.',
      keyHighlight: 'OWASP-compliant, encrypted pipelines with automated secret vulnerability checks.'
    },
    {
      id: 7,
      question: "What's your typical project timeline?",
      answer: 'Most targeted MVPs and specialized tools take between 4 to 8 weeks from kickoff to production deployment. Larger enterprise systems with custom integrations typically take 10 to 16 weeks, delivered iteratively in bi-weekly deployable sprints.',
      keyHighlight: '4 to 8 weeks for MVPs, 10 to 16 weeks for full-scale enterprise platforms.'
    }
  ];

  get currentFaq(): FaqItem {
    return this.faqs.find(f => f.id === this.activeId()) || this.faqs[0];
  }

  setActive(id: number) {
    this.activeId.set(id);
  }
}
