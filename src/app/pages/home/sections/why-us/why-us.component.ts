import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent {
  cards = [
    {
      num: '/01',
      type: 'light',
      title: 'You own everything you pay for',
      description: 'All Git repositories, system architecture diagrams, Figma design systems, and database schemas belong 100% to you. No proprietary locks, no hostage licensing fees.'
    },
    {
      num: '/02',
      type: 'dark-navy',
      title: 'Direct line to the people building it',
      description: 'No account managers playing telephone. You speak directly with the senior engineers writing your code, with immediate turnaround and daily async progress logs.'
    },
    {
      num: '/03',
      type: 'dark-blue',
      title: 'Whatever stack actually fits',
      description: "We don't force pet frameworks. We choose technologies based on your team's existing skill sets, performance SLAs, and long-term maintenance costs."
    },
    {
      num: '/04',
      type: 'light',
      title: 'AI where it earns its place',
      description: 'We deploy AI and autonomous agents where they cut verifiable hours and operational costs — not as decorative buzzwords tacked onto marketing brochures.'
    }
  ];
}
