import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-scale-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scale.page.html',
  styleUrl: './scale.page.scss'
})
export class ScalePage {
  dataService = inject(DataService);

  scaleMetrics = this.dataService.scaleMetrics;
  clientLogos = this.dataService.clientLogos;

  securityPillars = [
    {
      title: 'OWASP & SOC2 Compliance',
      desc: 'All API endpoints and administrative panels are engineered with strict input sanitization, rate-limiting, and penetration testing.'
    },
    {
      title: 'Automated CI/CD Verification',
      desc: 'Unit, integration, and end-to-end regression tests run automatically before code ever touches staging or production servers.'
    },
    {
      title: 'Sub-Second Global Edge Latency',
      desc: 'Architected with edge caching, HTTP/3, and distributed cloud microservices ensuring lightning-fast user experiences anywhere.'
    },
    {
      title: 'Zero-Downtime Infrastructure',
      desc: 'Containerized Kubernetes deployments with automated health checks, rolling updates, and self-healing cluster pods.'
    }
  ];
}
