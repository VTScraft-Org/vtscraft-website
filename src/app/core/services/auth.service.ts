import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ADMIN_USER = 'vtscraft_admin';
  private readonly ADMIN_PASS = 'VTS@2026#secure';

  private _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    this.checkSession();
  }

  login(username: string, password: string): boolean {
    if (username === this.ADMIN_USER && password === this.ADMIN_PASS) {
      this._isLoggedIn.set(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this._isLoggedIn.set(false);
    localStorage.removeItem('isAdmin');
  }

  checkSession(): boolean {
    const active = localStorage.getItem('isAdmin') === 'true';
    this._isLoggedIn.set(active);
    return active;
  }
}
