import { Routes } from '@angular/router';

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
    path: 'password-recovery',
    loadComponent: () =>
      import('@core/auth/pages/password-recovery/password-recovery.component').then(
        (c) => c.PasswordRecoveryComponent
      ),
  },
];
