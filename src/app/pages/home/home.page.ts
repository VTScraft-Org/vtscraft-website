import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  dataService = inject(DataService);

  services = this.dataService.services;
  projects = this.dataService.projects;
  painPoints = this.dataService.painPoints;
  whyChooseUs = this.dataService.whyChooseUs;
  processSteps = this.dataService.processSteps;
  faqs = this.dataService.faqs;
  founder = this.dataService.founder;
  scaleMetrics = this.dataService.scaleMetrics;
  clientLogos = this.dataService.clientLogos;

  activeFaqIndex = signal<number | null>(0);
  activePainPointIndex = signal<number>(0);

  toggleFaq(index: number): void {
    this.activeFaqIndex.update(curr => curr === index ? null : index);
  }

  selectPainPoint(index: number): void {
    this.activePainPointIndex.set(index);
  }
}
