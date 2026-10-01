import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', routerLink: '/' },
    { label: 'Services', routerLink: '/services' },
    { label: 'Work (Case Studies)', routerLink: '/work' },
    { label: 'Scale & Enterprise', routerLink: '/scale' },
    { label: 'About & Leadership', routerLink: '/about' },
    { label: 'Contact Us', routerLink: '/contact' }
  ];

  servicesList = [
    { label: 'Mobile App Development', routerLink: '/services', fragment: 'mobile-apps' },
    { label: 'Modern Web Engineering', routerLink: '/services', fragment: 'websites' },
    { label: 'Admin Panels & Dashboards', routerLink: '/services', fragment: 'admin-panels' },
    { label: 'Custom Enterprise Software', routerLink: '/services', fragment: 'custom-software' },
    { label: 'Cloud Architecture & DevOps', routerLink: '/services', fragment: 'cloud-devops' },
    { label: 'UI/UX Design Systems', routerLink: '/services', fragment: 'design-creative' }
  ];
}
