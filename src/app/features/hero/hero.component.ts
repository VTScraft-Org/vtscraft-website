import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  coreServices = [
    { title: 'Mobile Apps', icon: 'smartphone', desc: 'iOS & Android' },
    { title: 'Websites', icon: 'globe', desc: 'Fast & Scalable' },
    { title: 'Admin Panels', icon: 'layout-dashboard', desc: 'Realtime Insights' },
    { title: 'Custom Software', icon: 'cpu', desc: 'Tailored Enterprise' }
  ];
}
