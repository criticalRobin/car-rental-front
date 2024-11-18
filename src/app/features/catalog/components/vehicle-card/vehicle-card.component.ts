import { Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';

const MATERIAL = [MatIconModule, MatButtonModule];

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css',
})
export class VehicleCardComponent {
  public vehicle: InputSignal<ICatalogVehicle> =
    input.required<ICatalogVehicle>();
}
