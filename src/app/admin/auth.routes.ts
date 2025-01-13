import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const authRoutesAdmin: Routes = [

    {
        path: 'vehicles',
        loadComponent: () =>
          import('../admin/pages/vehicles/vehicles.component').then(
            (c) => c.VehiclesComponent
          ),
          canActivate: [AuthGuard],
      }, 
      {
        path: 'types-vehicles',
        loadComponent: () =>
          import('./pages/types/types.component').then(
            (c) => c.TypesVehiclesComponent
          ),
          canActivate: [AuthGuard],
      }, 
      {
        path: 'admin',
        loadComponent: () =>
          import('../admin/admin.component').then(
            (c) => c.AdminComponent
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'maintenance', 
        loadComponent: () =>
          import('./pages/maintenance/maintenance.component').then(
            (c) => c.MaintenanceComponent
          ),
          canActivate: [AuthGuard],
      }
];
