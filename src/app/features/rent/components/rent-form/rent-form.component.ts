import { Component, inject, input, InputSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RentalDuration } from '@features/rent/enums/rentalDuration';
import { IRent } from '@features/rent/models/rent';
import { Router } from '@angular/router';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { IBillingInfo } from '@features/rent/pages/billing-info/models/billing-info';
import { RentService } from '@features/rent/services/rent.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
];

@Component({
  selector: 'app-rent-form',
  standalone: true,
  imports: [MATERIAL, ReactiveFormsModule],
  templateUrl: './rent-form.component.html',
  styleUrl: './rent-form.component.css',
})
export class RentFormComponent {
  private fb = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly rentSrv: RentService = inject(RentService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  protected rentalDurations: RentalDuration[] = [
    RentalDuration.DAILY,
    RentalDuration.WEEKLY,
    RentalDuration.MONTHLY,
  ];
  protected minDate: Date = new Date();
  protected rentForm: FormGroup = this.fb.group({
    rentalDuration: [RentalDuration.DAILY, [Validators.required]],
    quantityOfDuration: [1, [Validators.required]],
    rentalDate: ['', [Validators.required]],
  });

  public vehicle: InputSignal<ICatalogVehicle | null> =
    input<ICatalogVehicle | null>(null);
  public billingInfo: InputSignal<IBillingInfo | null> =
    input<IBillingInfo | null>(null);

  constructor() {
    this.minDate.setHours(0, 0, 0, 0);
  }

  onSubmit(): void {
    if (this.rentForm.valid) {
      const rentData: IRent = {
        clientId: this.billingInfo()?.idNumber!,
        vehicleId: this.vehicle()?.vehicleId!,
        rentalDuration:
          this.rentForm.get('rentalDuration')?.value === RentalDuration.DAILY
            ? 'DAILY'
            : this.rentForm.get('rentalDuration')?.value ===
              RentalDuration.WEEKLY
            ? 'WEEKLY'
            : 'MONTHLY',
        quantityOfDuration: this.rentForm.get('quantityOfDuration')?.value,
        rentalDate: this.rentForm
          .get('rentalDate')
          ?.value.toISOString()
          .split('T')[0],
      };

      this.rentSrv.createRent(rentData).subscribe({
        next: () => {
          this.router.navigate(['/rental-list']);
          this.notificationSrv.activateNotification(
            'Alquiler registrado!',
            StateNotification.SUCCESS
          );
        },
        error: () => {
          this.notificationSrv.activateNotification(
            'Error al registrar alquiler',
            StateNotification.ERROR
          );
        },
      });
    }
  }
}
