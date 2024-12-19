import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const rentRoutes: Routes = [
  {
    path: 'rent',
    loadComponent: () =>
      import('@features/rent/rent.component').then((c) => c.RentComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'billing-info',
    loadComponent: () =>
      import('@features/rent/pages/billing-info/billing-info.component').then(
        (c) => c.BillingInfoComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'rental-list',
    loadComponent: () =>
      import('@features/rent/pages/rental-list/rental-list.component').then(
        (c) => c.RentalListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'rental-status',
    loadComponent: () =>
      import('@features/rent/pages/rental-status/rental-status.component').then(
        (c) => c.RentalStatusComponent
      ),
    canActivate: [AuthGuard],
  },
];
