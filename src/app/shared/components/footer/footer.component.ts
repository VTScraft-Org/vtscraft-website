import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = 2026;

  exploreLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Work', route: '/work' },
    { label: 'Scale', route: '/scale' },
    { label: 'Career', route: '/career' },
    { label: 'Services', route: '/services' },
  ];

  servicesLinks = [
    { label: 'Web Development', route: '/services', fragment: 'web-dev' },
    { label: 'Mobile App Development', route: '/services', fragment: 'mobile-app' },
    { label: 'Cloud Services', route: '/services', fragment: 'cloud-services' },
    { label: 'AI & Generative AI', route: '/services', fragment: 'ai-genai' },
    { label: 'Software Development', route: '/services', fragment: 'software-dev' },
    { label: 'Automation & Integration', route: '/services', fragment: 'automation-integration' },
  ];

  contactLinks = [
    { label: 'Book Discovery Call', route: '/contact' },
    { label: 'Project Inquiry', route: '/contact' },
    { label: 'contact.vtscraft@gmail.com', href: 'mailto:contact.vtscraft@gmail.com', isExternal: true },
    { label: '+91 80757 25045', href: 'tel:+918075725045', isExternal: true },
  ];
}
