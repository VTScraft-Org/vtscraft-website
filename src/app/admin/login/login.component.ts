import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class AdminLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  async onSubmit(): Promise<void> {
    this.error.set('');
    this.loading.set(true);
    await new Promise((r) => setTimeout(r, 400)); // UX delay
    const ok = this.auth.login(this.username, this.password);
    this.loading.set(false);
    if (ok) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error.set('Invalid credentials. Please try again.');
    }
  }
}
