import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage {
  dataService = inject(DataService);
  founder = this.dataService.founder;

  values = [
    {
      title: 'Craftsmanship Over Quantity',
      desc: 'We purposefully take on a select number of client engagements at a time. Every architecture is custom, every line of code tested, and every UI pixel inspected.'
    },
    {
      title: 'Radical Engineering Transparency',
      desc: 'No black-box development. You have direct access to Git commits, sprint backlogs, and real-time staging environments from sprint day one.'
    },
    {
      title: 'Long-Term Architecture',
      desc: 'We build systems that can smoothly transition from handling hundreds of users to hundreds of thousands without necessitating a complete rewrite.'
    },
    {
      title: 'Global Delivery Excellence',
      desc: 'Rooted in India, we deliver world-class software engineering with unmatched agility, cultural alignment, and round-the-clock progress for international clients.'
    }
  ];
}
