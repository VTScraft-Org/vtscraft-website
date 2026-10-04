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
    { title: 'Fintech', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', highlight: 'Payments & Ledger Reconciliation' },
    { title: 'Retail & E-Commerce', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop', highlight: 'Headless Storefronts & Logistics' },
    { title: 'Healthcare', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', highlight: 'HIPAA Workflows & Patient Portals' },
    { title: 'Sports', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=400&fit=crop', highlight: 'Telemetry, Bookings & Club Ops' },
    { title: 'Logistics & Ops', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop', highlight: 'Fleet Routing & Dispatch Funnels' },
    { title: 'Real Estate', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', highlight: 'Tenant Management & PropTech' },
    { title: 'SaaS & Services', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', highlight: 'Multi-Tenant Cloud Architectures' },
    { title: 'Hospitality', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', highlight: 'Guest Booking & POS Aggregation' },
    { title: 'Education & EdTech', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop', highlight: 'LMS Engines & Adaptive Learning' },
    { title: 'Professional Services', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop', highlight: 'Billing & Automated Workflows' },
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
