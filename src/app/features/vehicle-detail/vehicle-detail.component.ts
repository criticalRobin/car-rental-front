import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { GaleryComponent } from './components/galery/galery.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [GaleryComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent {
  private readonly router: Router = inject(Router);

  protected images: string[] = [];

  constructor() {
    const vehicle: ICatalogVehicle =
      this.router.getCurrentNavigation()?.extras.state?.['vehicle'];
    console.log(vehicle);

    if (vehicle) {
      this.images = this.chargeImagesArray(vehicle);
    }
  }

  chargeImagesArray(vehicle: ICatalogVehicle): string[] {
    return vehicle.images.map((image) => image.imageUrl);
  }
}
