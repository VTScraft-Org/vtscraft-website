import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  stats = [
    {
      title: '25+ Projects Delivered',
      subtext: 'Across a range of industries from manufacturing to healthcare to Real estate.'
    },
    {
      title: '20+ Clients Served',
      subtext: 'From first-time founders to established enterprises.'
    },
    {
      title: 'Across 10+ Countries',
      subtext: 'U.S.A, U.K, U.A.E, Qatar, India, Netherlands and more.'
    }
  ];

  clientLogos = [
    { id: 'people-maketh', name: 'People Maketh' },
    { id: 'sm-malabar', name: 'SM MALABAR LLP' },
    { id: 'secure-matrix', name: 'SECURE MATRIX' },
    { id: 'sonexia', name: 'SONEXIA' },
    { id: 'kinetic', name: 'KINETIC' },
    { id: 'liminal', name: 'LIMINAL AUTO SOLUTIONS' },
    { id: 'lylux', name: 'LYLUX' },
    { id: 'meiris', name: 'MEIRIS' },
    { id: 'decorations', name: '360 DECORATIONS' }
  ];
}
