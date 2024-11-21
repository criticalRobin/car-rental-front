import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const vehicleDeatilRoutes: Routes = [
  {
    path: 'vehicle-detail',
    loadComponent: () =>
      import('@features/vehicle-detail/vehicle-detail.component').then(
        (c) => c.VehicleDetailComponent
      ),
    canActivate: [AuthGuard],
  },
];
