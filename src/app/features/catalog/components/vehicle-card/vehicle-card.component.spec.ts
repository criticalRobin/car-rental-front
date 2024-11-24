import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCardComponent } from './vehicle-card.component';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';

describe('VehicleCardComponent', () => {
  let component: VehicleCardComponent;
  let fixture: ComponentFixture<VehicleCardComponent>;
  const vechicle: ICatalogVehicle = {
    vehicleId: 14,
    brand: 'Toyota',
    model: 'Corolla',
    licensePlate: 'ABC123',
    status: 'AVAILABLE',
    active: true,
    acquisitionDate: '2020-03-15',
    mileage: 25000.0,
    location: 'Nueva York',
    type: 'Sedán',
    dailyRate: 100.0,
    images: [
      {
        imageId: 12,
        imageUrl:
          'http://res.cloudinary.com/dyawf0vyu/image/upload/v1731952470/corolla%20sedan-potencia.png.jpg',
      },
      {
        imageId: 30,
        imageUrl:
          'http://res.cloudinary.com/dyawf0vyu/image/upload/v1732202773/image-removebg-preview%20%281%29.png.jpg',
      },
      {
        imageId: 31,
        imageUrl:
          'http://res.cloudinary.com/dyawf0vyu/image/upload/v1732202899/image-removebg-preview%20%282%29.png.jpg',
      },
    ],
    airConditioning: true,
    numberOfDoors: 4,
    fuelType: 'GASOLINE',
    transmissionType: 'AUTOMATIC',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('vehicle', vechicle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
