import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Return } from '../../models/return.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReturnService } from '../../services/returns.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class ReturnModalComponent implements OnInit {
  returnForm: FormGroup;
  damages = [
    { label: 'Puerta', value: 100, controlName: 'door' },
    { label: 'Vidrios', value: 200, controlName: 'windows' },
    { label: 'Parachoque Delantero', value: 100, controlName: 'frontBumper' },
    { label: 'Parachoque Trasero', value: 100, controlName: 'rearBumper' },
    { label: 'Tapicería', value: 300, controlName: 'upholstery' },
    { label: 'Aire Acondicionado', value: 150, controlName: 'airConditioner' },
    { label: 'Luces', value: 100, controlName: 'lights' },
    { label: 'Neumáticos', value: 300, controlName: 'tires' },
  ];
  delayFeePerDay = 50;
  notificationService = inject(NotificationService);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReturnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Return | null,
    private returnService: ReturnService 
  ) {
    this.returnForm = this.fb.group({
      rentalId: [{ value: '', disabled: true }, Validators.required],
      licensePlate: [{ value: '', disabled: true }, Validators.required],
      clientIdNumber: [{ value: '', disabled: true }, Validators.required],
      delayDays: [0, [Validators.required, Validators.min(0), Validators.max(365)]],
      total: [{ value: 0, disabled: true }],
      ...this.damages.reduce(
        (controls, damage) => ({
          ...controls,
          [damage.controlName]: [false], // Default: Perfecto
        }),
        {}
      ),
    });
  }
  
  ngOnInit(): void {
    if (this.data) {
      this.returnForm.patchValue({
        rentalId: this.data.rentalId,
        licensePlate: this.data.licensePlate,
        clientIdNumber: this.data.clientIdNumber,
      });
      this.updateTotal();
    }
  }

  updateTotal(): void {
    let total = 0;

    this.damages.forEach((damage) => {
      if (this.returnForm.get(damage.controlName)?.value) {
        total += damage.value;
      }
    });

    const delayDays = this.returnForm.get('delayDays')?.value || 0;
    const delayPenalty = delayDays * 50;

    total += delayPenalty;

    this.returnForm.get('total')?.setValue(total);

  }

  sendReturnWithoutDamage(returnData: { rentalId: number, returnDate: string, lateFee: number }): void {
    this.returnService.sendReturnWithoutDamage(returnData).subscribe({
      next: (response) => {
        console.log('Devolución sin daños enviada:', response);
        this.dialogRef.close(); 
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
      },
    });
  }

  save(): void {
    if (this.returnForm.valid) {
      const total = this.returnForm.get('total')?.value;
  
      if (total === 0) {
        // Devolución sin daños
        const returnData = {
          rentalId: this.data?.rentalId!,
          returnDate: new Date().toISOString().split('T')[0],
          lateFee: 0,
        };
        this.sendReturnWithoutDamage(returnData);

        this.notificationService.activateNotification(
          'Auto devuelto sin daños',
          StateNotification.SUCCESS
        );
        localStorage.removeItem('sessionId');

      } else {
        // Devolución con daños
        const returnDetails = this.damages
          .filter((damage) => this.returnForm.get(damage.controlName)?.value)
          .map((damage) => ({
            partName: damage.label,
            status: 'DAMAGED',
            damageCost: damage.value,
          }));
  
        const rentalId = this.data?.rentalId!;
        const returnData = {
          rentalId,
          returnDate: new Date().toISOString().split('T')[0],
          returnDetails,
        };
  
        // Guardar rentalId en Local Storage
        localStorage.setItem('rentalId', rentalId.toString());
  
        // Enviar devolución con daños
        this.returnService.sendReturnWithDamage(returnData).subscribe({
          next: (response) => {
            console.log('Devolución con daños enviada:', response);

            // Iniciar proceso de pago
            const stripePaymentData = {
              rentalId,
              amount: total,
              successUrl: 'http://localhost:4200/returns',
              cancelUrl: 'http://localhost:4200/returns',
              typePayment: 'RETURN',
            };
  
            this.returnService.initiateStripePayment(stripePaymentData).subscribe({
              next: (stripeResponse) => {
                console.log('Stripe session iniciada:', stripeResponse);
                // Guardar sessionId en Local Storage
                localStorage.setItem('sessionId', stripeResponse.sessionId);
                // Abrir URL en una nueva pestaña
                window.location.href = stripeResponse.url;
                // Cerrar el modal
                this.dialogRef.close();
              },
              error: (stripeError) => {
                console.error('Error al iniciar Stripe:', stripeError);
              },
            });
          },
          error: (error) => {
            console.error('Error al enviar los datos:', error);
          },
        });
      }
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
