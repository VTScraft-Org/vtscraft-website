import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent {
  whatsappNumber = '910000000000'; // Default WhatsApp contact
  whatsappMessage = encodeURIComponent("Hi VTScraft! I'd like to discuss a project.");
}
