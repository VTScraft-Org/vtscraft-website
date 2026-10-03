import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export type BtnVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type BtnSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  @Input() variant: BtnVariant = 'primary';
  @Input() size: BtnSize = 'md';
  @Input() routerLink?: string | string[];
  @Input() href?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;

  get classes(): string {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const sizes: Record<BtnSize, string> = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    const variants: Record<BtnVariant, string> = {
      primary: 'bg-[var(--vts-green)] text-[var(--vts-navy)] hover:bg-[var(--vts-green-dark)] shadow-lg shadow-[var(--vts-green)]/25 focus:ring-[var(--vts-green)]',
      secondary: 'bg-[var(--vts-blue)] text-white hover:bg-[var(--vts-blue)]/80 focus:ring-[var(--vts-blue)]',
      outline: 'border-2 border-[var(--vts-green)] text-[var(--vts-green)] hover:bg-[var(--vts-green)] hover:text-[var(--vts-navy)] focus:ring-[var(--vts-green)]',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/20',
    };

    return [base, sizes[this.size], variants[this.variant], this.fullWidth ? 'w-full' : ''].join(' ');
  }
}
