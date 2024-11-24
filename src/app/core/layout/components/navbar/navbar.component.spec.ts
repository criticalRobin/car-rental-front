import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '@core/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationItem } from '@core/layout/models/navigation-item.interface';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthSrv: jasmine.SpyObj<AuthService>;
  let router: Router;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    mockAuthSrv = jasmine.createSpyObj('AuthService', [
      'getLoggedUserFromLocalStorage',
      'removeLoggedUserFromLocalStorage',
    ]);

    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'defaultToken',
      role: 'DEFAULT_ROLE',
      fullName: 'Default User',
      email: 'default@example.com',
    });

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthSrv },
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load navigation items for ADMIN role', () => {
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'ADMIN',
      fullName: 'John Doe',
      email: 'john@gmail.com',
    });

    component.ngOnInit();
    fixture.detectChanges();

    const items: NavigationItem[] = [
      { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
      { title: 'Vehiculos', icon: 'directions_car', route: '/vehicles' },
      {
        title: 'Tipos Vehiculos',
        icon: 'directions_car',
        route: '/types-vehicles',
      },
      { title: 'Reservas', icon: 'person_pin', route: '/settings' },
      { title: 'Facturas', icon: 'note_add', route: '/bills' },
      { title: 'Usuarios', icon: 'group', route: '/users' },
    ];

    expect(component.navigationItems).toEqual(items);
  });

  it('should load navigation items for CLIENT role', () => {
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'CLIENT',
      fullName: 'John Doe',
      email: 'john@gmail.com',
    });

    component.ngOnInit();
    fixture.detectChanges();

    const items: NavigationItem[] = [
      { title: 'Vehiculos', icon: 'directions_car', route: '/catalog' },
    ];

    expect(component.navigationItems).toEqual(items);
  });

  it('sould redirect to / when logout', () => {
    spyOn(router, 'navigate');

    component.logout();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
