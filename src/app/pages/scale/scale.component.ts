import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-scale',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent {
  industries = [
    { title: 'Fintech', icon: '💳', highlight: 'Payments & Ledger Reconciliation' },
    { title: 'Retail & E-Commerce', icon: '🛍️', highlight: 'Headless Storefronts & Logistics' },
    { title: 'Healthcare', icon: '🏥', highlight: 'HIPAA Workflows & Patient Portals' },
    { title: 'Sports', icon: '⚽', highlight: 'Telemetry, Bookings & Club Ops' },
    { title: 'Logistics & Ops', icon: '🚚', highlight: 'Fleet Routing & Dispatch Funnels' },
    { title: 'Real Estate', icon: '🏢', highlight: 'Tenant Management & PropTech' },
    { title: 'SaaS & Services', icon: '⚡', highlight: 'Multi-Tenant Cloud Architectures' },
    { title: 'Hospitality', icon: '🏨', highlight: 'Guest Booking & POS Aggregation' },
    { title: 'Education & EdTech', icon: '🎓', highlight: 'LMS Engines & Adaptive Learning' },
    { title: 'Professional Services', icon: '💼', highlight: 'Billing & Automated Workflows' },
  ];

  attributePills = [
    'Problem Clarity',
    'Openness to Process',
    'Long-Term Thinking',
    'Direct Communication'
  ];

  testimonials = [
    {
      quote: 'VTScraft dismantled our bloated $60k/year enterprise software and replaced it with a custom CRM that does exactly what our sales team needs. Speed and transparency was unlike any agency we worked with.',
      author: 'Tariq Al-Mansoor',
      role: 'Managing Director',
      company: 'Lylux Lighting Group (Dubai, UAE)',
      rating: 5
    },
    {
      quote: 'Their principal engineers took complete ownership of our automated security scanner. They don’t just write code; they challenge architectural assumptions to make systems unshakeable.',
      author: 'Marcus Vance',
      role: 'Head of Infrastructure',
      company: 'SecureThread Technologies (London, UK)',
      rating: 5
    },
    {
      quote: 'We went from manual spreadsheets to an automated rental booking and dispatch platform within 7 weeks. 100% code ownership on day one made investor due diligence a breeze.',
      author: 'Vikram Sengupta',
      role: 'Co-Founder & CEO',
      company: 'Trendz Sports Network (New Delhi, India)',
      rating: 5
    }
  ];
}
