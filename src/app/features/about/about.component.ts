import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  coreValues = [
    {
      title: 'Craftsmanship First',
      desc: 'We treat code as a craft. Clean architecture, automated testing, and maintainability are built into everything we ship.',
      icon: 'sparkles'
    },
    {
      title: 'Digital Excellence',
      desc: 'From intuitive user interfaces to resilient backends, we do not settle for average. Every solution is built to outperform.',
      icon: 'target'
    },
    {
      title: 'Transparent Collaboration',
      desc: 'Direct communication, weekly sprint demos, and full repository visibility. No surprises, just steady progress.',
      icon: 'message-circle'
    },
    {
      title: 'Global Delivery From India',
      desc: 'Leveraging India’s premier software talent pool to deliver world-class engineering with agility and competitive efficiency.',
      icon: 'globe'
    }
  ];

  stats = [
    { number: '99.8%', label: 'Delivery Quality' },
    { number: '4+', label: 'Flagship Domains' },
    { number: '100%', label: 'Dedicated Support' },
    { number: '24/7', label: 'Ecosystem Monitoring' }
  ];
}
