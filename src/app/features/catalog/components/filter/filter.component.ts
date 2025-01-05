import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FuelType } from '@features/catalog/enums/fuel-type.enum';
import { TransmissionType } from '@features/catalog/enums/transmission.enum';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
];

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MATERIAL, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  public selectedBrand: string = '';
  public minRate: number = 0;
  public maxRate: number = 0;
  public airConditioning: boolean | null = null;
  public numberOfDoors: number = 0;
  public fuelType: FuelType | null = null;
  public transmissionType: TransmissionType | null = null;

  @Output() brandChanged = new EventEmitter<string>();
  @Output() minRateChanged = new EventEmitter<number>();
  @Output() maxRateChanged = new EventEmitter<number>();
  @Output() airConditioningChanged = new EventEmitter<boolean | null>();
  @Output() numberOfDoorsChanged = new EventEmitter<number>();
  @Output() fuelTypeChanged = new EventEmitter<FuelType | null>();
  @Output() transmissionTypeChanged =
    new EventEmitter<TransmissionType | null>();

  @Output() cleanedFiltersEvent = new EventEmitter<void>();

  public fuelTypes: FuelType[] = [
    FuelType.ELECTRIC,
    FuelType.GASOLINE,
    FuelType.HYBRID,
  ];
  public transmissionTypes: TransmissionType[] = [
    TransmissionType.AUTOMATIC,
    TransmissionType.MANUAL,
  ];

  onBrandChange(): void {
    this.brandChanged.emit(this.selectedBrand);
  }

  onMinRateChange(): void {
    this.minRateChanged.emit(this.minRate);
  }

  onMaxRateChange(): void {
    this.maxRateChanged.emit(this.maxRate);
  }

  onAirConditioningChange(): void {
    this.airConditioningChanged.emit(this.airConditioning);
  }

  onNumberOfDoorsChange(): void {
    this.numberOfDoorsChanged.emit(this.numberOfDoors);
  }

  onFuelTypeChange(): void {
    this.fuelTypeChanged.emit(this.fuelType);
  }

  onTransmissionTypeChange(): void {
    this.transmissionTypeChanged.emit(this.transmissionType);
  }

  cleanFilters(): void {
    this.selectedBrand = '';
    this.minRate = 0;
    this.maxRate = 0;
    this.airConditioning = null;
    this.numberOfDoors = 0;
    this.fuelType = null;
    this.transmissionType = null;
    this.cleanedFiltersEvent.emit();
  }
}
