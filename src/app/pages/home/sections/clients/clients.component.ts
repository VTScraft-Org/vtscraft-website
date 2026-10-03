import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  logos = [
    { name: 'NEXUS FLOW', symbol: 'NX' },
    { name: 'VERTEX LABS', symbol: 'VX' },
    { name: 'STRATA CLOUD', symbol: 'SC' },
    { name: 'FINNOVA TECH', symbol: 'FN' },
    { name: 'AURA SYSTEMS', symbol: 'AS' },
    { name: 'KINETIC AI', symbol: 'KA' },
  ];
}
