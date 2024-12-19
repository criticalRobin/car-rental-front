import { Component, inject, OnInit } from '@angular/core';
import { RentalStatusTableComponent } from './components/rental-status-table/rental-status-table.component';
import { RentalStatusService } from './services/rental-status.service';
import { NotificationService } from '@shared/services/notification.service';
import { IRentalList } from '../rental-list/models/rental-list';
import { StateNotification } from '@shared/enums/state-notification';

@Component({
  selector: 'app-rental-status',
  standalone: true,
  imports: [RentalStatusTableComponent],
  templateUrl: './rental-status.component.html',
  styleUrl: './rental-status.component.css',
})
export class RentalStatusComponent implements OnInit {
  private readonly rentalStatusSrv: RentalStatusService =
    inject(RentalStatusService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  protected rentalList: IRentalList[] = [];

  ngOnInit(): void {
    this.loadRentalList();
  }

  loadRentalList() {
    this.rentalStatusSrv.listRentals().subscribe({
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
}
