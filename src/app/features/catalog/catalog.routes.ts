import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const catalogRoutes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('@features/catalog/catalog.component').then(
        (c) => c.CatalogComponent
      ),
    canActivate: [AuthGuard],
  },
];
