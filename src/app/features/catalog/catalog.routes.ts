import { Routes } from '@angular/router';

export const catalogRoutes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('@features/catalog/catalog.component').then(
        (c) => c.CatalogComponent
      ),
  },
];
