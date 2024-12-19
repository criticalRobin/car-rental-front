import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { GaleryComponent } from './components/galery/galery.component';
import { DetailCardComponent } from './components/detail-card/detail-card.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [GaleryComponent, DetailCardComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent {
  private readonly router: Router = inject(Router);

  protected vehicle: ICatalogVehicle | null = null;
  protected images: string[] = [];

  constructor() {
    this.vehicle =
      this.router.getCurrentNavigation()?.extras.state?.['vehicle'];

    if (this.vehicle) {
      this.images = this.chargeImagesArray(this.vehicle);
    }
  }

  chargeImagesArray(vehicle: ICatalogVehicle): string[] {
    return vehicle.images.map((image) => image.imageUrl);
  }
}
