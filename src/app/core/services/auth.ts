import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSignal = signal<boolean>(this.checkAuth());

  isAdmin() {
    return this.isAdminSignal.asReadonly();
  }

  private checkAuth(): boolean {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('vtscraft_auth');
      if (auth) {
        return JSON.parse(auth).isAdmin === true;
      }
    }
    return false;
  }

  login(username: string, password: string): boolean {
    if (username === 'vtscraft_admin' && password === 'VTS@2026#secure') {
      localStorage.setItem('vtscraft_auth', JSON.stringify({ isAdmin: true }));
      this.isAdminSignal.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('vtscraft_auth');
    this.isAdminSignal.set(false);
  }
}
