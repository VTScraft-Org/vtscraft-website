import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.page.html',
  styleUrl: './services.page.scss'
})
export class ServicesPage {
  dataService = inject(DataService);
  services = this.dataService.services;
}
