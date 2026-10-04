import { Injectable, signal, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  private supabase = inject(SupabaseService);

  constructor() {
    this.checkSession();
    
    this.supabase.clientInstance.auth.onAuthStateChange((event, session) => {
      this._isLoggedIn.set(!!session);
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const { error } = await this.supabase.clientInstance.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    
    this._isLoggedIn.set(true);
    return true;
  }

  async logout(): Promise<void> {
    await this.supabase.clientInstance.auth.signOut();
    this._isLoggedIn.set(false);
  }

  async checkSession(): Promise<boolean> {
    const { data: { session } } = await this.supabase.clientInstance.auth.getSession();
    const active = !!session;
    this._isLoggedIn.set(active);
    return active;
  }
}
