import { Routes } from '@angular/router';

export const authRoutesAdmin: Routes = [

    {
        path: 'vehicles',
        loadComponent: () =>
          import('../admin/pages/vehicles/vehicles.component').then(
            (c) => c.VehiclesComponent
          ),
      }, 
      {
        path: 'types-vehicles',
        loadComponent: () =>
          import('./pages/types/types.component').then(
            (c) => c.TypesVehiclesComponent
          ),
      }, 
      {
        path: 'admin',
        loadComponent: () =>
          import('../admin/admin.component').then(
            (c) => c.AdminComponent
          ),
      },
];
