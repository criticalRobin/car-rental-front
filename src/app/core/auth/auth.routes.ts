import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@core/auth/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@core/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('@core/auth/pages/vehicles/vehicles.component').then(
        (c) => c.VehiclesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('@core/auth/pages/admin/admin.component').then(
        (c) => c.AdminComponent
      ),
    canActivate: [AuthGuard],
  },
];
