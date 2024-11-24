import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginFormComponent } from './components/login-form/login-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthSrv: jasmine.SpyObj<AuthService>;
  let router: Router;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    mockAuthSrv = jasmine.createSpyObj('AuthService', [
      'getLoggedUserFromLocalStorage',
    ]);

    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'defaultToken',
      role: 'DEFAULT_ROLE',
      fullName: 'Default User',
      email: 'default@example.com',
    });

    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule, LoginFormComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: AuthService, useValue: mockAuthSrv },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form component and static elements', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-login-form')).not.toBeNull();

    const welcomeText = compiled.querySelector('span.text-2xl')?.textContent;
    expect(welcomeText).toContain('Hola de nuevo!');

    const subtitle = compiled.querySelector('span.text-sm')?.textContent;
    expect(subtitle).toContain('Bienvenido de vuelta, comencemos!');
  });

  it('should redirect to /admin if user is logged and role is ADMIN', () => {
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'ADMIN',
      fullName: 'John Doe',
      email: 'jhon@gmail.com',
    });

    spyOn(router, 'navigate');

    component.loggedUserRedirector();

    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should redirect to /catalog if user is logged and role is CLIENT', () => {
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'CLIENT',
      fullName: 'Jane Doe',
      email: 'jane@gmail.com',
    });

    spyOn(router, 'navigate');

    component.loggedUserRedirector();

    expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
  });

  it('should not redirect if user is not logged', () => {
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: '',
      fullName: 'Unknown User',
      email: 'unknown@gmail.com',
    });

    spyOn(router, 'navigate');

    component.loggedUserRedirector();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
