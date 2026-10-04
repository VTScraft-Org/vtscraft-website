import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'NA',
      role: 'Founder & Principal Systems Architect',
      specialty: 'Distributed Systems & Cloud Infrastructure',
      avatarInitial: 'NA'
    },
    {
      name: 'NA',
      role: 'Head of AI & Automation',
      specialty: 'Enterprise LLM Pipelines & Agent Swarms',
      avatarInitial: 'NA'
    },
    {
      name: 'NA',
      role: 'Lead Product & UX Designer',
      specialty: 'Design Systems & High-Velocity Prototyping',
      avatarInitial: 'NA'
    },
    // {
    //   name: 'Kunal Singhania',
    //   role: 'Senior DevOps & Security Lead',
    //   specialty: 'Kubernetes, CI/CD & SOC2 Hardening',
    //   avatarInitial: 'KS'
    // }
  ];

  values = [
    {
      title: 'Family First, Agency Second',
      desc: 'We work as people before we work as colleagues. Space, trust, and honesty come before the actual output.',
      image: 'assets/images/values/family.jpg'
    },
    {
      title: 'Zero Shortcuts',
      desc: 'Every decision gets made properly, not quickly. Precision isn\'t optional, it is the baseline foundation at VTScraft.',
      image: 'assets/images/values/shortcuts.jpg'
    },
    {
      title: 'Direct Always',
      desc: 'No hierarchy blocking the conversation. Internally or with clients, you talk to the person, not just a layer.',
      image: 'assets/images/values/direct.jpg'
    },
    {
      title: 'Space to Grow',
      desc: 'Room to breathe when you need it. A commitment to upskilling when you\'re ready for more.',
      image: 'assets/images/values/grow.jpg'
    },
    {
      title: 'Built to Last',
      desc: 'Everything we make, internally and externally, is built to survive, not to impress in the moment.',
      image: 'assets/images/values/built.jpg'
    }
  ];
}
