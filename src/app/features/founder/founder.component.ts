import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FounderProfile } from '../../models/founder.model';

@Component({
  selector: 'app-founder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './founder.component.html',
  styleUrl: './founder.component.scss'
})
export class FounderComponent {
  /**
   * =========================================================================
   * FOUNDER DETAILS CONFIGURATION
   * Edit this object anytime to update the Founder's Name, Title, Bio, 
   * Photo, Expertise, and Social links.
   * =========================================================================
   */
  founder = signal<FounderProfile>({
    name: 'Founder & Tech Visionary', // <-- You can change your name here
    role: 'Founder & CEO',            // <-- You can change your title here
    companyTag: 'VTS Craft',
    headline: 'Crafting Next-Generation Digital Products with Engineering Rigor',
    bio: [
      'Driven by an unwavering passion for technological craftsmanship, I established VTS Craft to empower businesses and visionary leaders with premier software engineering. Our mission is to bridge complex business challenges with elegant, scalable code.',
      'From agile mobile architectures to mission-critical enterprise admin panels, we assemble best-in-class engineers in India delivering world-class digital solutions for clients globally.'
    ],
    quote: 'True digital excellence happens at the intersection of aesthetic design, solid architecture, and genuine client empathy.',
    image: '', // Leave empty to use modern initials avatar, or set to 'images/founder.jpg'
    avatarBgColor: 'var(--grad-brand)',
    expertise: [
      'Product Architecture',
      'Mobile & Web Strategy',
      'Enterprise Scalability',
      'Team Leadership'
    ],
    stats: [
      { value: '100%', label: 'Commitment to Quality' },
      { value: 'Direct', label: 'Client Consultation' },
      { value: 'Agile', label: 'Sprint Methodology' }
    ],
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
      { platform: 'twitter', url: 'https://twitter.com', label: 'Twitter / X' },
      { platform: 'github', url: 'https://github.com', label: 'GitHub' },
      { platform: 'email', url: 'mailto:founder@vtscraft.com', label: 'Email' }
    ]
  });
}
