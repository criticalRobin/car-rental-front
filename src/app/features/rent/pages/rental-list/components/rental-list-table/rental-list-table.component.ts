import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IRentalList } from '../../models/rental-list';
import { CommonModule } from '@angular/common';
import { IPayment, IPaymentResponse } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

const MATERIAL = [
  MatFormFieldModule,
  MatPaginator,
  MatSort,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-rental-list-table',
  standalone: true,
  imports: [MATERIAL, CommonModule],
  templateUrl: './rental-list-table.component.html',
  styleUrl: './rental-list-table.component.css',
})
export class RentalListTableComponent {
  private readonly paymentService: PaymentService = inject(PaymentService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  protected displayedColumns: string[] = [
    'clientIdNumber',
    'vehicleBrand',
    'vehicleModel',
    'rentalDate',
    'returnDate',
    'totalAmount',
    'status',
    'actions',
  ];

  public rentalList: InputSignal<IRentalList[]> = input<IRentalList[]>([]);
  dataSource: MatTableDataSource<IRentalList>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource<IRentalList>([]);

    effect(() => {
      const data = this.rentalList();
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  makePayment(rental: IRentalList) {
    const paymentData: IPayment = {
      rentalId: rental.rentalId,
      amount: rental.totalAmount,
      successUrl: 'http://localhost:4200/rental-list',
      cancelUrl: 'http://localhost:4200/catalog',
      typePayment: 'RENTAL',
    };

    this.paymentService.pay(paymentData).subscribe({
      next: (res: IPaymentResponse) => {
        localStorage.setItem('sessionId', res.sessionId);
        window.location.href = res.url;
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al generar el pago',
          StateNotification.ERROR
        );
      },
    });
  }
}
