import { Component, inject } from '@angular/core';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { IBillingInfo } from './pages/billing-info/models/billing-info';
import { Router } from '@angular/router';
import { RentFormComponent } from './components/rent-form/rent-form.component';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [RentFormComponent],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css',
})
export class RentComponent {
  private readonly router: Router = inject(Router);

  protected vehicle: ICatalogVehicle | null = null;
  protected billingInfo: IBillingInfo | null = null;

  constructor() {
    this.getInitialData();
  }

  getInitialData() {
    const data: any[] =
      this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.billingInfo = data[0];
    this.vehicle = data[1];
  }
}
