import { Component, inject, OnInit } from '@angular/core';
import { RentalListTableComponent } from './components/rental-list-table/rental-list-table.component';
import { IRentalList } from './models/rental-list';
import { ILoginResponse } from '@core/auth/pages/login/models/login.interface';
import { RentalListService } from './services/rental-list.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-rental-list',
  standalone: true,
  imports: [RentalListTableComponent],
  templateUrl: './rental-list.component.html',
  styleUrl: './rental-list.component.css',
})
export class RentalListComponent implements OnInit {
  private readonly rentalListSrv: RentalListService = inject(RentalListService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);
  private readonly paymentSrv: PaymentService = inject(PaymentService);

  protected rentalList: IRentalList[] = [];

  ngOnInit(): void {
    this.loadRentalList();

    setTimeout(() => {
      this.makePayment();
    }, 20000);
  }

  loadRentalList() {
    const { email }: ILoginResponse = JSON.parse(
      localStorage.getItem('loggedUser')!
    );

    this.rentalListSrv.listRentals(email).subscribe({
      next: (rentalList: IRentalList[]) => {
        this.rentalList = rentalList;
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al cargar el listado de alquileres',
          StateNotification.ERROR
        );
      },
    });
  }

  makePayment() {
    const sessionId: string | null = localStorage.getItem('sessionId') || null;

    if (sessionId === null) return;

    this.paymentSrv.savePayment(sessionId).subscribe({
      next: () => {
        this.notificationSrv.activateNotification(
          'Pago realizado con éxito',
          StateNotification.SUCCESS
        );
        this.loadRentalList();
        localStorage.removeItem('sessionId');
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al realizar el pago',
          StateNotification.ERROR
        );
        localStorage.removeItem('sessionId');
      },
    });
  }
}
