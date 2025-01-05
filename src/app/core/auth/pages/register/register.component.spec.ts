import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './components/register-form/register-form.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        BrowserAnimationsModule,
        RegisterFormComponent,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render register form component and static elements', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const registerForm = compiled.querySelector('app-register-form');
    expect(registerForm).not.toBeNull();

    const welcomeText = compiled.querySelector('span.text-2xl')?.textContent;
    expect(welcomeText).toContain('Listo para iniciar!');

    const subtitle = compiled.querySelector('span.text-sm')?.textContent;
    expect(subtitle).toContain('Registrate para comenzar!');
  });
});
