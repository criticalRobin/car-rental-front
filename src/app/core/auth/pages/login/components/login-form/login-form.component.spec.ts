import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginService } from '../../services/login.service';
import { of } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockAuthSrv: jasmine.SpyObj<AuthService>;
  let mockLoginSrv: jasmine.SpyObj<LoginService>;
  let router: Router;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    mockAuthSrv = jasmine.createSpyObj('AuthService', [
      'getLoggedUserFromLocalStorage',
      'saveLoggedUserInLocalStorage',
    ]);
    mockLoginSrv = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AuthService, useValue: mockAuthSrv },
        { provide: LoginService, useValue: mockLoginSrv },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to /admin if role is ADMIN', () => {
    mockLoginSrv.login.and.returnValue(
      of({
        token: 'dsadasda',
        role: 'ADMIN',
        fullName: 'John Doe',
        email: 'jhon@gmail.com',
      })
    );

    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'ADMIN',
      fullName: 'John Doe',
      email: 'jhon@gmail.com',
    });

    spyOn(router, 'navigate');

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should redirect to /catalog if role is CLIENT', () => {
    mockLoginSrv.login.and.returnValue(
      of({
        token: 'dsadasda',
        role: 'CLIENT',
        fullName: 'Jane Doe',
        email: 'jane@gmail.com',
      })
    );
    
    mockAuthSrv.getLoggedUserFromLocalStorage.and.returnValue({
      token: 'dsadasda',
      role: 'CLIENT',
      fullName: 'Jane Doe',
      email: 'jane@gmail.com',
    });

    spyOn(router, 'navigate');

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
  });
});
