import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

const MATERIAL = [MatIconModule, MatButtonModule];

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent implements OnInit {
  private readonly router: Router = inject(Router);

  public vehicle: InputSignal<ICatalogVehicle | null> =
    input.required<ICatalogVehicle | null>();

  ngOnInit(): void {}

  redirectToBillingInfo(): void {
    const vehicle = this.vehicle();
    this.router.navigate(['/billing-info'], { state: { vehicle } });
  }
}
