import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BillingInfoFormComponent } from '../billing-info-form/billing-info-form.component';
import { BillingInfoService } from '../../services/billing-info.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL = [
  MatButtonModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatIconModule,
];

@Component({
  selector: 'app-billing-info-modal',
  standalone: true,
  imports: [MATERIAL, BillingInfoFormComponent],
  templateUrl: './billing-info-modal.component.html',
  styleUrl: './billing-info-modal.component.css',
})
export class BillingInfoModalComponent {
  protected readonly dialogRef = inject(
    MatDialogRef<BillingInfoModalComponent>
  );
  private billingInfoService = inject(BillingInfoService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);
  private formComponent?: BillingInfoFormComponent;

  @ViewChild(BillingInfoFormComponent) set content(
    content: BillingInfoFormComponent
  ) {
    if (content) {
      this.formComponent = content;
    }
  }

  submitForm(): void {
    this.formComponent?.onSubmit();
  }

  onFormSubmitted(formValue: any): void {
    this.billingInfoService.createBillingInfo(formValue).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.notificationSrv.activateNotification(
          'Info de facturación creada correctamente',
          StateNotification.SUCCESS
        );
      },
      error: () => {
        this.dialogRef.close(true);
        this.notificationSrv.activateNotification(
          'Error al crear la info de facturación',
          StateNotification.ERROR
        );
      },
    });
  }
}
