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
      number: '20+',
      title: 'Projects Delivered',
      subtext: 'Across industries from fintech to healthcare'
    },
    {
      number: '15+',
      title: 'Clients Served',
      subtext: 'From first-time founders to established enterprises'
    },
    {
      number: '8+',
      title: 'Countries',
      subtext: 'India, UAE, Qatar, USA, UK and more'
    }
  ];
}
