import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TypeVehicleService } from '../../services/type-vehicle.service';
import { of } from 'rxjs';
import { VehicleModalComponent } from './vehicle-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VehicleModalComponent', () => {
  let component: VehicleModalComponent;
  let fixture: ComponentFixture<VehicleModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<VehicleModalComponent>>;
  let mockTypeVehicleService: jasmine.SpyObj<TypeVehicleService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockTypeVehicleService = jasmine.createSpyObj('TypeVehicleService', ['getTypeVehicles']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        VehicleModalComponent,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { brand: 'Toyota', model: 'Corolla' } },
        { provide: TypeVehicleService, useValue: mockTypeVehicleService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleModalComponent);
    component = fixture.componentInstance;
    mockTypeVehicleService.getTypeVehicles.and.returnValue(of([{ typeId: 1, name: 'SUV' }]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.vehicleForm).toBeTruthy();
    expect(component.vehicleForm.get('brand')?.value).toBe('Toyota');
    expect(component.vehicleForm.get('model')?.value).toBe('Corolla');
  });

  it('should load type vehicles on init', () => {
    component.ngOnInit();
    expect(mockTypeVehicleService.getTypeVehicles).toHaveBeenCalled();
    expect(component.typeVehicles.length).toBe(1);
    expect(component.typeVehicles[0].name).toBe('SUV');
  });

  it('should disable fields in edit mode', () => {
    component.ngOnInit();
    expect(component.vehicleForm.get('brand')?.disabled).toBeTrue();
    expect(component.vehicleForm.get('typeId')?.disabled).toBeTrue();
  });

  it('should add selected files to the images array', () => {
    const mockFile = new File([''], 'image1.jpg');
    const mockEvent = {
      target: {
        files: [mockFile],
      },
    } as unknown as Event;

    component.onFileSelected(mockEvent);
    expect(component.images.length).toBe(1);
    expect(component.images[0].name).toBe('image1.jpg');
  });

  it('should remove an image from the array', () => {
    const mockFile = new File([''], 'image1.jpg');
    component.images = [mockFile];
    component.removeImage(0);
    expect(component.images.length).toBe(0);
  });

  it('should close the dialog with form data on save', () => {
    component.vehicleForm.patchValue({
      brand: 'Toyota',
      model: 'Corolla',
      licensePlate: 'ABC-123',
      typeId: 1,
      status: 'AVAILABLE',
      acquisitionDate: '2023-01-01',
      mileage: 10000,
      location: 'City Center',
      airConditioning: true,
      numberOfDoors: 4,
      fuelType: 'GASOLINE',
      transmissionType: 'MANUAL',
    });

    component.save();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      vehicle: component.vehicleForm.getRawValue(),
      images: component.images,
    });
  });

  it('should close the dialog on cancel', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

 
});
