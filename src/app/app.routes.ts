import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
