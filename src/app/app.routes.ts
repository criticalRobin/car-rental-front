import { Routes } from '@angular/router';
import { authRoutes } from '@core/auth/auth.routes';
import { catalogRoutes } from '@features/catalog/catalog.routes';
import { authRoutesAdmin } from './admin/auth.routes'

export const routes: Routes = [
  ...authRoutes,
  ...catalogRoutes,
  ...authRoutesAdmin,
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
