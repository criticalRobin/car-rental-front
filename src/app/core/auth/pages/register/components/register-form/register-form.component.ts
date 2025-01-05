import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { IRegisterRequest } from '../../models/register.interface';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MATERIAL, RouterLink, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly registerSrv: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);

  public hidePassword: WritableSignal<boolean> = signal(true);
  public hideConfirmPassword: WritableSignal<boolean> = signal(true);
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor() {
    this.registerForm
      .get('confirmPassword')
      ?.valueChanges.subscribe(() => this.matchValidator());
  }

  clickEvent(event: MouseEvent, buttonRef: number): void {
    if (buttonRef === 1) {
      this.hidePassword.set(!this.hidePassword());
    } else {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
    event.stopPropagation();
  }

  matchValidator(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ notMatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit(): void {
    const registerData: IRegisterRequest = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.registerSrv.register(registerData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err),
    });
  }
}
