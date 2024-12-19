import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const returnRoutes: Routes = [
  {
    path: 'returns',
    loadComponent: () =>
      import('@features/returns/returns.component').then(
        (c) => c.ReturnsComponent
      ),
    canActivate: [AuthGuard],
  },
];
