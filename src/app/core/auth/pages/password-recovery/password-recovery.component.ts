import { Component } from '@angular/core';
import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [PasswordRecoveryFormComponent],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {

}