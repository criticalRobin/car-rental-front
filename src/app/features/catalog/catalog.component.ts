import { Component } from '@angular/core';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { ICatalogVehicle } from './models/catalog-vehicle.interface';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [VehicleCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  protected vehicle: ICatalogVehicle = {
    vehicleId: 1,
    brand: 'Honda',
    model: 'Civic Type R',
    licensePlate: 'AA-123-BB',
    status: 'RENTED',
    active: true,
    acquisitionDate: '2020-11-09',
    mileage: 45000.0,
    location: 'Bucharest',
    type: 'Deportivo',
    dailyRate: 65.0,
    images: [],
  };
}
