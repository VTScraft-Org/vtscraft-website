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
      number: '01',
      title: '100% Ownership Day One',
      desc: 'No lock-in, no hostage code. You own the Git repositories, infrastructure definitions, and intellectual property from the first commit.'
    },
    {
      number: '02',
      title: 'Radical Engineering Transparency',
      desc: 'No project managers playing broken telephone. You communicate directly with the senior engineers writing your code with daily async logs.'
    },
    {
      number: '03',
      title: 'Purposeful AI, Zero Gimmickry',
      desc: 'We only integrate machine learning and autonomous agents where they eliminate real operational bottlenecks and demonstrate concrete ROI.'
    },
    {
      number: '04',
      title: 'Built for Operational Endurance',
      desc: 'We write clean, strictly-typed code tested under production load, backed by post-launch warranty and SLAs so you never feel abandoned.'
    }
  ];
}
