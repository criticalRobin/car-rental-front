import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehiclesComponent } from './vehicles.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { of } from 'rxjs';
import { VehicleService } from './services/vehicles.service';
import { TypeVehicleService } from './services/type-vehicle.service';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let mockVehicleService: jasmine.SpyObj<VehicleService>;
  let mockTypeVehicleService: jasmine.SpyObj<TypeVehicleService>;

  beforeEach(waitForAsync(() => {
    // Mock de los servicios
    mockVehicleService = jasmine.createSpyObj('VehicleService', ['getVehicles']);
    mockTypeVehicleService = jasmine.createSpyObj('TypeVehicleService', ['getTypeVehicles']);

    // Mock de datos
    const mockVehicles = [
      {
        vehicleId: 1,
        brand: 'Toyota',
        model: 'Corolla',
        licensePlate: 'XYZ123',
        typeId: 1,
        status: 'AVAILABLE',
        acquisitionDate: '2022-01-01',
        mileage: 10000,
        location: 'Garage',
        airConditioning: true,
        numberOfDoors: 4,
        fuelType: 'Gasoline',
        transmissionType: 'Automatic',
        images: [],
      },
    ];
    mockVehicleService.getVehicles.and.returnValue(of(mockVehicles));
    mockTypeVehicleService.getTypeVehicles.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        VehiclesComponent, // Importamos el componente standalone
        SearchBarComponent, // Importamos los componentes hijos standalone
        PaginatorComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: VehicleService, useValue: mockVehicleService },
        { provide: TypeVehicleService, useValue: mockTypeVehicleService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render search bar', () => {
    const searchBar = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('should render the button to add vehicles', () => {
    const addButton = fixture.nativeElement.querySelector('.add-vehicle-button');
    expect(addButton).toBeTruthy();
    expect(addButton.textContent).toContain('Agregar Vehículo');
  });

  it('should load initial vehicle data', () => {
    expect(component.vehicles.length).toBe(1);
    expect(component.vehicles[0].brand).toBe('Toyota');
  });
});
