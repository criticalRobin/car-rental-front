import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-billing-info-form',
  standalone: true,
  imports: [MATERIAL, CommonModule, ReactiveFormsModule],
  templateUrl: './billing-info-form.component.html',
  styleUrl: './billing-info-form.component.css',
})
export class BillingInfoFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BillingInfoFormComponent>);

  public formSubmitted: OutputEmitterRef<any> = output<any>();

  protected billingInfoForm: FormGroup = this.fb.group({
    idNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    secondName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    secondLastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    user: [''],
  });

  onSubmit(): void {
    if (this.billingInfoForm.valid) {
      console.log('Form submitted');
      const formValue = this.billingInfoForm.value;
      formValue.user = formValue.email;

      this.formSubmitted.emit(formValue);
    }
  }
}
