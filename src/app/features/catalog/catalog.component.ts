import { Component, inject, OnInit } from '@angular/core';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { ICatalogVehicle } from './models/catalog-vehicle.interface';
import { FilterComponent } from './components/filter/filter.component';
import { CatalogService } from './services/catalog.service';
import { TransmissionType } from './enums/transmission.enum';
import { FuelType } from './enums/fuel-type.enum';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [VehicleCardComponent, FilterComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  private readonly catalogSrv: CatalogService = inject(CatalogService);

  protected catalog: ICatalogVehicle[] = [];
  protected filteredCatalog: ICatalogVehicle[] = [];
  protected catalogAmount: number = 0;

  private filters: {
    brand: string;
    minRate: number;
    maxRate: number;
    airConditioning: boolean | null;
    numberOfDoors: number;
    fuelType: FuelType | null;
    transmissionType: TransmissionType | null;
  } = {
    brand: '',
    minRate: 0,
    maxRate: 0,
    airConditioning: null,
    numberOfDoors: 0,
    fuelType: null,
    transmissionType: null,
  };

  ngOnInit(): void {
    this.loadCatalogVehicles();
  }

  loadCatalogVehicles(): void {
    this.catalogSrv.getCatalogVehicles().subscribe({
      next: (vehicles: ICatalogVehicle[]) => {
        const catalogToStore = this.checkTransmissionTypeAndFuelType(vehicles);
        this.catalogSrv.saveCatalogInLocalStorage(catalogToStore);
        this.catalog = this.catalogSrv.getCatalogFromLocalStorage();
        this.filteredCatalog = [...this.catalog];
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  checkTransmissionTypeAndFuelType(
    vehicles: ICatalogVehicle[]
  ): ICatalogVehicle[] {
    return vehicles.map((vehicle) => {
      vehicle.transmissionType =
        vehicle.transmissionType === 'AUTOMATIC'
          ? TransmissionType.AUTOMATIC
          : TransmissionType.MANUAL;
      vehicle.fuelType =
        vehicle.fuelType === 'GASOLINE'
          ? FuelType.GASOLINE
          : vehicle.fuelType === 'ELECTRIC'
          ? FuelType.ELECTRIC
          : FuelType.HYBRID;
      return vehicle;
    });
  }

  applyFilters(): void {
    this.filteredCatalog = this.catalog.filter((vehicle) => {
      return (
        (!this.filters.brand || vehicle.brand.includes(this.filters.brand)) &&
        (this.filters.minRate === 0 ||
          vehicle.dailyRate >= this.filters.minRate) &&
        (this.filters.maxRate === 0 ||
          vehicle.dailyRate <= this.filters.maxRate) &&
        (this.filters.airConditioning === null ||
          vehicle.airConditioning === this.filters.airConditioning) &&
        (this.filters.numberOfDoors === 0 ||
          vehicle.numberOfDoors === this.filters.numberOfDoors) &&
        (this.filters.fuelType === null ||
          vehicle.fuelType === this.filters.fuelType) &&
        (this.filters.transmissionType === null ||
          vehicle.transmissionType === this.filters.transmissionType)
      );
    });
  }

  onBrandChange(brand: string): void {
    this.filters.brand = brand;
    this.applyFilters();
  }

  onMinRateChange(minRate: number): void {
    this.filters.minRate = minRate;
    this.applyFilters();
  }

  onMaxRateChange(maxRate: number): void {
    this.filters.maxRate = maxRate;
    this.applyFilters();
  }

  onAirConditioningChange(airConditioning: boolean | null): void {
    this.filters.airConditioning = airConditioning;
    this.applyFilters();
  }

  onNumberOfDoorsChange(numberOfDoors: number): void {
    this.filters.numberOfDoors = numberOfDoors;
    this.applyFilters();
  }

  onFuelTypeChange(fuelType: FuelType | null): void {
    this.filters.fuelType = fuelType;
    this.applyFilters();
  }

  onTransmissionTypeChange(transmissionType: TransmissionType | null): void {
    this.filters.transmissionType = transmissionType;
    this.applyFilters();
  }

  onCleanedFilters(): void {
    this.filters = {
      brand: '',
      minRate: 0,
      maxRate: 0,
      airConditioning: null,
      numberOfDoors: 0,
      fuelType: null,
      transmissionType: null,
    };
    this.filteredCatalog = [...this.catalog];
  }
}
