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
    { label: 'Blog', route: '/blog' },
  ];

  servicesLinks = [
    { label: 'AI & LLM Automation', route: '/services/ai-llm' },
    { label: 'Software / Website Dev', route: '/services/software-development' },
    { label: 'Mobile App Dev.', route: '/services/mobile-app' },
    { label: 'CRM/ERP Solutions', route: '/services/crm-erp' },
    { label: 'Design & Creative', route: '/services/design-creative' },
  ];

  contactLinks = [
    { label: 'Book Call', route: '/contact' },
    { label: 'Project Inquiry', route: '/contact' },
    { label: 'contact.vtscraft@gmail.com', href: 'mailto:contact.vtscraft@gmail.com', isExternal: true },
    { label: '+91 XXXXX XXXXX', href: 'tel:+910000000000', isExternal: true },
  ];
}
