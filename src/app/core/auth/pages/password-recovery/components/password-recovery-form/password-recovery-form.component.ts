import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service'; // Ajusta la ruta según la estructura
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-password-recovery-form',
  standalone: true,
  imports: [FormsModule, ...MATERIAL, RouterLink],
  //imports: [MATERIAL, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password-recovery-form.component.html',
  styleUrl: './password-recovery-form.component.css',
})
export class PasswordRecoveryFormComponent {
  protected hide = signal(true);
  email: string = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.email)
      .then(() => {
        this.snackBar.open('Se ha enviado un enlace de restablecimiento a tu correo', 'Cerrar', { duration: 3000 });
      })
      .catch(error => {
        this.snackBar.open('Error: ' + error.message, 'Cerrar', { duration: 3000 });
      });
  }
}
