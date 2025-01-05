import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IRentalList } from '@features/rent/pages/rental-list/models/rental-list';
import { RentalStatusService } from '../../services/rental-status.service';
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
  selector: 'app-rental-status-table',
  standalone: true,
  imports: [MATERIAL, CommonModule],
  templateUrl: './rental-status-table.component.html',
  styleUrl: './rental-status-table.component.css',
})
export class RentalStatusTableComponent {
  private readonly rentalStatusSrv: RentalStatusService =
    inject(RentalStatusService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  public updateEventEmitter: OutputEmitterRef<void> = output<void>();

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

  updateRentalStatus(rentalId: number) {
    this.rentalStatusSrv.updateRentalStatus(rentalId).subscribe({
      next: () => {
        this.notificationSrv.activateNotification(
          'Alquiler Aprobado!',
          StateNotification.SUCCESS
        );
        this.updateEventEmitter.emit();
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al aprobar el alquiler',
          StateNotification.ERROR
        );
      },
    });
  }
}
