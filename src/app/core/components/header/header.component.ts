import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private dataService = inject(DataService);
  themeService = inject(ThemeService);
  
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  servicesDropdownOpen = signal(false);
  mobileServicesOpen = signal(false);

  services = this.dataService.services;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 25);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileServicesOpen.set(false);
  }

  toggleMobileServices(event: Event): void {
    event.preventDefault();
    this.mobileServicesOpen.update(v => !v);
  }
}
