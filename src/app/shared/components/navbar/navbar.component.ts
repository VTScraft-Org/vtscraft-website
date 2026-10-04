import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavChild {
  label: string;
  route: string;
  fragment?: string;
}

interface NavItem {
  label: string;
  route?: string;
  children?: NavChild[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  /** Shrinks the pill on scroll */
  isScrolled = signal(false);

  /** Desktop hover dropdown */
  isServicesHovered = signal(false);

  /** Debounce timer for hover leave */
  private hoverLeaveTimer: ReturnType<typeof setTimeout> | null = null;

  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    {
      label: 'Services',
      route: '/services',
      children: [
        { label: 'Web Development',           route: '/services', fragment: 'web-dev' },
        { label: 'Mobile App Development',   route: '/services', fragment: 'mobile-app' },
        { label: 'Cloud Services',             route: '/services', fragment: 'cloud-services' },
        { label: 'AI & Generative AI',        route: '/services', fragment: 'ai-genai' },
        { label: 'Conversational AI',         route: '/services', fragment: 'conversational-ai' },
        { label: 'Software Development',      route: '/services', fragment: 'software-dev' },
        { label: 'UI/UX & Product Design',    route: '/services', fragment: 'ui-ux-design' },
        { label: 'Automation & Integration',  route: '/services', fragment: 'automation-integration' },
        { label: 'Data & Analytics',          route: '/services', fragment: 'data-analytics' },
        { label: 'Maintenance & IT Support',  route: '/services', fragment: 'maintenance-support' },
      ],
    },
    { label: 'Work',    route: '/work'    },
    { label: 'Scale',   route: '/scale'   },
    { label: 'About',   route: '/about'   },
    { label: 'Career',  route: '/career'  },
  ];

  /** Mobile drawer open/closed state */
  mobileMenuOpen = signal(false);

  /** Mobile services accordion toggle */
  mobileServicesOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileServicesOpen.set(false);
  }

  toggleMobileServices(event: Event): void {
    event.stopPropagation();
    this.mobileServicesOpen.update(open => !open);
  }

  // ─── Desktop hover ────────────────────────────────────────────────────────

  onServicesEnter(): void {
    if (this.hoverLeaveTimer) {
      clearTimeout(this.hoverLeaveTimer);
      this.hoverLeaveTimer = null;
    }
    this.isServicesHovered.set(true);
  }

  onServicesLeave(): void {
    this.hoverLeaveTimer = setTimeout(() => {
      this.isServicesHovered.set(false);
    }, 120);
  }
}
