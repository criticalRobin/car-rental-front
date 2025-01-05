import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCardComponent } from './vehicle-card.component';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { Router } from '@angular/router';

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

  it('should render vehicle details correctly', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('img').src).toContain(
      vechicle.images[0].imageUrl
    );
    expect(compiled.querySelector('.text-2xl').textContent).toContain(
      `${vechicle.brand} ${vechicle.model}`
    );
  });

  it('should display default image if no vehicle images are available', () => {
    const vehicleWithoutImages = { ...vechicle, images: [] };
    fixture.componentRef.setInput('vehicle', vehicleWithoutImages);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain('images/honda.jpg');
  });

  it('should navigate to vehicle detail page on button click', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['/vehicle-detail'], {
      state: { vehicle: vechicle },
    });
  });
});
