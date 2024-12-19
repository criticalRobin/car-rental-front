import {
  AfterViewInit,
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
import { IBillingInfo } from '../../models/billing-info';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BillingInfoModalComponent } from '../billing-info-modal/billing-info-modal.component';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { Router } from '@angular/router';

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
  selector: 'app-billing-info-table',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './billing-info-table.component.html',
  styleUrl: './billing-info-table.component.css',
})
export class BillingInfoTableComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private readonly router: Router = inject(Router);

  protected displayedColumns: string[] = [
    'idNumber',
    'firstName',
    'lastName',
    'email',
    'phone',
    'actions',
  ];

  public billingInfo: InputSignal<IBillingInfo[]> = input<IBillingInfo[]>([]);
  dataSource: MatTableDataSource<IBillingInfo>;
  public vehicle: InputSignal<ICatalogVehicle | null> =
    input<ICatalogVehicle | null>(null);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource<IBillingInfo>([]);

    effect(() => {
      const data = this.billingInfo();
      this.dataSource.data = data;
    });
  }

  openBillingInfoForm(): void {
    this.dialog.open(BillingInfoModalComponent, {
      width: '600px',
      height: '600px',
      data: {},
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

  redirectToBillingForm(billingInfo: IBillingInfo): void {
    const data: any[] = [billingInfo, this.vehicle()];
    this.router.navigate(['rent'], { state: { data } });
  }
}
