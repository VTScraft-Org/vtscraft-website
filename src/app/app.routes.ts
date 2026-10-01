import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    title: 'VTS Craft | Crafting Digital Excellence — IT Services & Software Solutions'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage),
    title: 'Services & Capabilities | VTS Craft'
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work.page').then(m => m.WorkPage),
    title: 'Case Studies & Selected Works | VTS Craft'
  },
  {
    path: 'scale',
    loadComponent: () => import('./pages/scale/scale.page').then(m => m.ScalePage),
    title: 'Enterprise Scale & Global Delivery | VTS Craft'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
    title: 'About Us & Leadership | VTS Craft'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage),
    title: 'Book a Discovery Call | VTS Craft'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
