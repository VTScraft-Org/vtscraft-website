import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  id: number;
  label: string;
  subBullets?: string[];
  heading: string;
  description: string;
  badge: string;
  showWhatsAppIcon?: boolean;
}

@Component({
  selector: 'app-how-we-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-we-work.component.html',
  styleUrls: ['./how-we-work.component.scss']
})
export class HowWeWorkComponent {
  activeStepId = signal<number>(1);

  steps: Step[] = [
    {
      id: 1,
      label: 'Discover',
      heading: 'A Conversation, not a pitch',
      description: 'We sit down with you to unpack your genuine operational bottleneck, current tech debt, and desired milestones. No slide decks or sales pressure—just deep architectural listening.',
      badge: 'Step 01 • Deep Listening',
      showWhatsAppIcon: true
    },
    {
      id: 2,
      label: 'Scope & Quote',
      heading: 'Fixed scope, transparent milestones',
      description: 'You receive a granular breakdown of architecture decisions, weekly sprint deliverables, and guaranteed pricing. Every line item is clearly defined before a single line of code is written.',
      badge: 'Step 02 • Granular Blueprint'
    },
    {
      id: 3,
      label: 'Build',
      subBullets: ['From scratch', 'On existing platforms', 'AI-Integrated'],
      heading: 'Rapid sprints with continuous shipping',
      description: 'Our senior engineering squad starts building immediately in bi-weekly staging releases. You see functional software iterate in real time, with full access to repositories and staging environments.',
      badge: 'Step 03 • Engineering Sprint'
    },
    {
      id: 4,
      label: 'Launch & Stay On',
      heading: 'Production deployment with zero handover gap',
      description: 'We handle zero-downtime production deployment, telemetry observability, and automated CI/CD pipelines. Then we remain embedded as your long-term engineering partner.',
      badge: 'Step 04 • Long-Term Partnership'
    }
  ];

  get currentStep(): Step {
    return this.steps.find(s => s.id === this.activeStepId()) || this.steps[0];
  }

  setStep(id: number) {
    this.activeStepId.set(id);
  }
}
