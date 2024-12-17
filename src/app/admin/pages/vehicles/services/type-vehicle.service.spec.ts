import { TestBed } from '@angular/core/testing';
import { TypeVehicleService } from './type-vehicle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TypeVehicleService', () => {
  let service: TypeVehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TypeVehicleService],
    });
    service = TestBed.inject(TypeVehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch type vehicles', () => {
    const mockTypes = [{ typeId: 1, name: 'Sedán' }];

    service.getTypeVehicles().subscribe((types) => {
      expect(types).toEqual(mockTypes);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/type-vehicles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTypes);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
