import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ─── Public Layout (Navbar + Footer) ────────────────────────────────────────
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'VTScraft — Crafting Digital Excellence',
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/services/services.component').then((m) => m.ServicesComponent),
        title: 'Services — VTScraft',
      },
      {
        path: 'work',
        loadComponent: () =>
          import('./pages/work/work.component').then((m) => m.WorkComponent),
        title: 'Our Work — VTScraft',
      },
      {
        path: 'scale',
        loadComponent: () =>
          import('./pages/scale/scale.component').then((m) => m.ScaleComponent),
        title: 'Scale — VTScraft',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
        title: 'About Us — VTScraft',
      },
      {
        path: 'career',
        loadComponent: () =>
          import('./pages/career/career.component').then((m) => m.CareerComponent),
        title: 'Career — VTScraft',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Contact Us — VTScraft',
      },
    ],
  },

  // ─── Admin (No Layout) ──────────────────────────────────────────────────────
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./admin/login/login.component').then((m) => m.AdminLoginComponent),
        title: 'Admin Login — VTScraft',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component').then((m) => m.AdminDashboardComponent),
        canActivate: [authGuard],
        title: 'Admin Dashboard — VTScraft',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },

  // ─── Wildcard redirect ──────────────────────────────────────────────────────
  {
    path: '**',
    redirectTo: '',
  },
];
