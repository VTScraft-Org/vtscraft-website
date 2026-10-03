import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavChild {
  label: string;
  route: string;
  icon: string;
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

  /** Mobile drawer open/close */
  isMobileOpen = signal(false);

  /** Desktop hover dropdown */
  isServicesHovered = signal(false);

  /** Mobile accordion */
  isMobileServicesOpen = signal(false);

  /** Debounce timer for hover leave */
  private hoverLeaveTimer: ReturnType<typeof setTimeout> | null = null;

  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    {
      label: 'Services',
      children: [
        { label: 'AI & LLM Automation',      route: '/services/ai-llm',                icon: '🤖' },
        { label: 'Software Development',      route: '/services/software-development',  icon: '💻' },
        { label: 'Mobile App Development',    route: '/services/mobile-app',            icon: '📱' },
        { label: 'CRM/ERP Solutions',         route: '/services/crm-erp',               icon: '📊' },
        { label: 'Design & Creative',         route: '/services/design-creative',       icon: '🎨' },
      ],
    },
    { label: 'Work',    route: '/work'    },
    { label: 'Scale',   route: '/scale'   },
    { label: 'About',   route: '/about'   },
    { label: 'Career',  route: '/career'  },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
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

  // ─── Mobile ───────────────────────────────────────────────────────────────

  toggleMobile(): void {
    this.isMobileOpen.update((v) => !v);
    if (!this.isMobileOpen()) {
      this.isMobileServicesOpen.set(false);
    }
  }

  toggleMobileServices(): void {
    this.isMobileServicesOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
    this.isMobileServicesOpen.set(false);
  }
}
