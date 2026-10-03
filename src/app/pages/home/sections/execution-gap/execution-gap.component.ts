import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AccordionItem {
  id: number;
  title: string;
  problem: string;
  solution: string;
}

@Component({
  selector: 'app-execution-gap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './execution-gap.component.html',
  styleUrls: ['./execution-gap.component.scss']
})
export class ExecutionGapComponent {
  expandedId = signal<number>(1);

  items: AccordionItem[] = [
    {
      id: 1,
      title: 'Built for average, not for you.',
      problem: 'Off-the-shelf software and cookie-cutter SaaS force your unique operational competitive advantage into rigid, generic templates.',
      solution: 'VTScraft architects bespoke systems engineered specifically around how your team communicates, decides, and executes.'
    },
    {
      id: 2,
      title: 'Scope that shifts, pricing that surprises',
      problem: 'Ambiguous initial estimates that inflate halfway through development with endless change orders and unexpected delays.',
      solution: 'Fixed-milestone scoping with transparent pricing, guaranteed delivery windows, and zero surprises.'
    },
    {
      id: 3,
      title: 'Automation that skips the real bottleneck',
      problem: 'Superficial "AI features" that produce flashy demos but fail to resolve deep data fragmentation and manual handoffs.',
      solution: 'Custom pipeline automation and enterprise LLM integrations engineered directly into your core operational bottlenecks.'
    },
    {
      id: 4,
      title: 'Support that disappears after launch',
      problem: 'The development team dumps code on Friday, leaves documentation on a napkin, and vanishes when production bugs appear.',
      solution: 'Our engineering team stays on-call post-launch with SLA warranties, live telemetry, and proactive optimization.'
    }
  ];

  toggleItem(id: number) {
    this.expandedId.update(current => current === id ? 0 : id);
  }
}
