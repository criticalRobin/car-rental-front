import { inject, Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILoginResponse } from '../pages/login/models/login.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  private readonly loggedUser: ILoginResponse =
    this.authSrv.getLoggedUserFromLocalStorage();

  canActivate(): boolean {
    const role: string = this.loggedUser.role;

    if (role !== 'CLIENTE') {
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/employee']);
      }
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
