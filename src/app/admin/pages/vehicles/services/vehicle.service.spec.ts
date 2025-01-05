import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicles.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vehicle } from '../models/vehicle.model';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  const mockVehicles: Vehicle[] = [
    {
      vehicleId: 1,
      brand: 'Toyota',
      model: 'Corolla',
      licensePlate: 'ABC123',
      typeId: 4,
      status: 'AVAILABLE',
      acquisitionDate: '2020-01-01',
      mileage: 15000,
      location: 'Nueva York',
      airConditioning: true,
      numberOfDoors: 4,
      fuelType: 'GASOLINE',
      transmissionType: 'AUTOMATIC',
      images: [{ imageId: 1, imageUrl: 'https://example.com/image1.jpg' }],
    },
    {
      vehicleId: 2,
      brand: 'Honda',
      model: 'Civic',
      licensePlate: 'XYZ789',
      typeId: 3,
      status: 'RENTED',
      acquisitionDate: '2019-06-15',
      mileage: 20000,
      location: 'Los Angeles',
      airConditioning: false,
      numberOfDoors: 4,
      fuelType: 'GASOLINE',
      transmissionType: 'MANUAL',
      images: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService],
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehicles', () => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/vehicles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should add a new vehicle', () => {
    const newVehicle: Partial<Vehicle> = {
      brand: 'Ford',
      model: 'Fiesta', // Asegúrate de que esto sea una cadena
      licensePlate: 'DEF456',
      typeId: 2,
      status: 'AVAILABLE',
      acquisitionDate: '2021-08-01',
      mileage: 12000,
      location: 'Miami',
      airConditioning: true,
      numberOfDoors: 4,
      fuelType: 'GASOLINE',
      transmissionType: 'AUTOMATIC',
    };
  
    service.addVehicle(newVehicle, []).subscribe((vehicle) => {
      // Asegúrate de que las expectativas manejen valores no definidos
      expect(vehicle.brand).toBe(newVehicle.brand || '');
      expect(vehicle.model).toBe(newVehicle.model || '');
      expect(vehicle.licensePlate).toBe(newVehicle.licensePlate || '');
    });
  
    const req = httpMock.expectOne(`${service['baseUrl']}/vehicles`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeInstanceOf(FormData);
  
    // Devuelve un vehículo completo como respuesta simulada
    req.flush({ ...newVehicle, vehicleId: 3 } as Vehicle);
  });
  

  it('should edit an existing vehicle', () => {
    const updatedVehicle: Partial<Vehicle> = {
      mileage: 16000,
      location: 'Updated Location',
    };

    service.editVehicle(1, updatedVehicle).subscribe((vehicle) => {
      expect(vehicle.mileage).toBe(16000);
      expect(vehicle.location).toBe('Updated Location');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/vehicles/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedVehicle);
    req.flush({ ...mockVehicles[0], ...updatedVehicle });
  });

 /* it('should delete a vehicle', () => {
    service.deleteVehicle(1).subscribe((response) => {
      expect(response).toBeUndefined(); // El método debería devolver undefined
    });
  
    const req = httpMock.expectOne(`${service['baseUrl']}/vehicles/1`);
    expect(req.request.method).toBe('DELETE');
  
    // Respuesta simulada sin cuerpo
    req.flush(null);
  });*/
});
