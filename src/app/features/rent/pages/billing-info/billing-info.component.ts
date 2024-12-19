import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BillingInfoTableComponent } from './components/billing-info-table/billing-info-table.component';
import { IBillingInfo } from './models/billing-info';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';

@Component({
  selector: 'app-billing-info',
  standalone: true,
  imports: [BillingInfoTableComponent],
  templateUrl: './billing-info.component.html',
  styleUrl: './billing-info.component.css',
})
export class BillingInfoComponent {
  private readonly router: Router = inject(Router);

  protected vehicle: ICatalogVehicle | null = null;
  protected billingInfo: IBillingInfo[] = [
    {
      id: 7,
      idNumber: '1803268505',
      firstName: 'Henry',
      lastName: 'Cortez',
      secondName: 'Steven',
      secondLastName: 'Chaglla',
      email: 'henrystevencortez@yahoo.es',
      phone: '0998366772',
    },
    {
      id: 8,
      idNumber: '1850137918',
      firstName: 'Matias',
      lastName: 'Tite',
      secondName: 'Ramiro',
      secondLastName: 'Haro',
      email: 'matiastite1@gmail.com',
      phone: '0990938744',
    },
  ];

  constructor() {
    this.vehicle =
      this.router.getCurrentNavigation()?.extras.state?.['vehicle'];
  }
}
