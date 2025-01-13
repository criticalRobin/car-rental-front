import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@core/auth/services/auth.service';
import { NavigationItem } from '@core/layout/models/navigation-item.interface';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@core/auth/pages/login/services/login.service';

const MATERIAL = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MATERIAL, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly loginSrv: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  public navigationItems: NavigationItem[] = [];
  protected logoutItem: NavigationItem = {
    title: 'Cerrar sesión',
    icon: 'exit_to_app',
    route: '/',
  };

  ngOnInit(): void {
    const { role } = this.authSrv.getLoggedUserFromLocalStorage();
    this.navigationItems = this.itemsPerRoleChecker(role);
  }

  private itemsPerRoleChecker(role: string): NavigationItem[] {
    let items: NavigationItem[] = [];

    if (role === 'ADMIN') {
      items = [
        { title: 'Vehiculos', icon: 'directions_car', route: '/vehicles' },
        {
          title: 'Tipos Vehiculos',
          icon: 'directions_car',
          route: '/types-vehicles',
        },
        { title: 'Alquileres', icon: 'person_pin', route: '/rental-status' },
        { title: 'Mantenimiento', icon: 'note_add', route: '/maintenance' },
      ];
    }

    if (role === 'EMPLOYEE') {
      console.log('ADMIN');
      items = [
        { title: 'Alquileres', icon: 'person_pin', route: '/rental-status' },
        { title: 'Devoluciones', icon: 'assignment_return', route: '/returns' },
        { title: 'Mantenimiento', icon: 'note_add', route: '/maintenance' },
      ];
    }

    if (role === 'CLIENT') {
      items = [
        { title: 'Vehiculos', icon: 'directions_car', route: '/catalog' },
        { title: 'Alquileres', icon: 'person_pin', route: '/rental-list' },
      ];
    }

    return items;
  }

  logout(): void {
    this.loginSrv.logout();
    this.router.navigate(['/']);
  }
}
