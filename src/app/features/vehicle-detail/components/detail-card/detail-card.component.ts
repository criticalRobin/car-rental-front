import { Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL = [MatIconModule, MatButtonModule];

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent {
  public vehicle: InputSignal<ICatalogVehicle | null> =
    input.required<ICatalogVehicle | null>();
}
