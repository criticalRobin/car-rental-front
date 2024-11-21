import { Routes } from '@angular/router';
import { authRoutes } from '@core/auth/auth.routes';
import { catalogRoutes } from '@features/catalog/catalog.routes';
import { vehicleDeatilRoutes } from '@features/vehicle-detail/vehicle-detail.routes';

export const routes: Routes = [
  ...authRoutes,
  ...catalogRoutes,
  ...vehicleDeatilRoutes,
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
