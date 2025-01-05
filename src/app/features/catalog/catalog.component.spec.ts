import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ICatalogVehicle } from './models/catalog-vehicle.interface';
import { CatalogService } from './services/catalog.service';
import { of } from 'rxjs';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let catalogService: CatalogService;

  const mockVehicles: ICatalogVehicle[] = [
    {
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
      ],
      airConditioning: true,
      numberOfDoors: 4,
      fuelType: 'GASOLINE',
      transmissionType: 'AUTOMATIC',
    },
    {
      vehicleId: 15,
      brand: 'Honda',
      model: 'Civic',
      licensePlate: 'XYZ789',
      status: 'AVAILABLE',
      active: true,
      acquisitionDate: '2021-05-10',
      mileage: 30000.0,
      location: 'Los Angeles',
      type: 'Sedán',
      dailyRate: 80.0,
      images: [
        {
          imageId: 13,
          imageUrl:
            'http://res.cloudinary.com/dyawf0vyu/image/upload/v1732202773/honda-civic.png.jpg',
        },
      ],
      airConditioning: false,
      numberOfDoors: 2,
      fuelType: 'HYBRID',
      transmissionType: 'MANUAL',
    },
  ];

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: CatalogService,
          useValue: {
            getCatalogVehicles: jasmine
              .createSpy('getCatalogVehicles')
              .and.returnValue(of(mockVehicles)),
            saveCatalogInLocalStorage: jasmine.createSpy(
              'saveCatalogInLocalStorage'
            ),
            getCatalogFromLocalStorage: jasmine
              .createSpy('getCatalogFromLocalStorage')
              .and.returnValue(mockVehicles),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    catalogService = TestBed.inject(CatalogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on initialization', () => {
    component.ngOnInit();
    expect(catalogService.getCatalogVehicles).toHaveBeenCalled();
    expect(component.catalog.length).toBe(mockVehicles.length);
    expect(component.filteredCatalog.length).toBe(mockVehicles.length);
  });

  it('should apply filters correctly', () => {
    component.onBrandChange('Toyota');
    expect(component.filteredCatalog.length).toBe(1);
    expect(component.filteredCatalog[0].brand).toBe('Toyota');

    component.onMinRateChange(90);
    expect(component.filteredCatalog.length).toBe(1);
    expect(component.filteredCatalog[0].dailyRate).toBe(100);

    component.onMaxRateChange(70);
    expect(component.filteredCatalog.length).toBe(0);
  });

  it('should handle air conditioning filter', () => {
    component.onAirConditioningChange(true);
    expect(component.filteredCatalog.length).toBe(1);
    expect(component.filteredCatalog[0].airConditioning).toBe(true);

    component.onAirConditioningChange(false);
    expect(component.filteredCatalog.length).toBe(1);
    expect(component.filteredCatalog[0].airConditioning).toBe(false);

    component.onAirConditioningChange(null);
    expect(component.filteredCatalog.length).toBe(2);
  });

  it('should handle cleaned filters event', () => {
    component.onCleanedFilters();
    expect(component.filteredCatalog.length).toBe(component.catalog.length);
    expect(component.filteredCatalog).toEqual(mockVehicles);
  });
});
