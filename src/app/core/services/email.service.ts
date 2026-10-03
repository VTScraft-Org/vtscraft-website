import { Injectable } from '@angular/core';

export interface EmailPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  /**
   * Send an email via EmailJS.
   * Configure EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY
   * in environment files before use.
   */
  async sendEmail(payload: EmailPayload): Promise<void> {
    // TODO: integrate EmailJS
    // import emailjs from '@emailjs/browser';
    // await emailjs.send(serviceId, templateId, payload, publicKey);
    console.log('EmailService.sendEmail called with:', payload);
  }
}
