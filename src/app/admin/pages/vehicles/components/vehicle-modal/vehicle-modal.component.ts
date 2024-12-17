import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { TypeVehicleService } from '../../services/type-vehicle.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../../services/vehicles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ]
})
export class VehicleModalComponent implements OnInit {
  vehicleForm: FormGroup;
  typeVehicles: any[] = [];
  images: File[] = [];
  brands: any[] = [];
  models: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private typeVehicleService: TypeVehicleService,
    public dialogRef: MatDialogRef<VehicleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicleForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      licensePlate: ['', Validators.required],
      typeId: ['', Validators.required],
      status: ['', Validators.required],
      acquisitionDate: ['', [Validators.required, this.validateDate]],
      mileage: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      airConditioning: [false],
      numberOfDoors: [4, [Validators.required, Validators.min(2)]],
      fuelType: ['', Validators.required],
      transmissionType: ['', Validators.required],
    });
  }

  validateDate(control: any): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const inputDate = new Date(control.value);
    const today = new Date();
  
    if (inputDate > today) {
      return { invalidFutureDate: true };
    }
  
    if (inputDate.getFullYear() > 9999) {
      return { invalidYear: true };
    }
    return null; 
  }
    ngOnInit(): void {
      console.log('Datos recibidos:', this.data); 
      this.isEditMode = !!this.data;
      this.loadTypeVehicles();
      this.loadBrands();
      
    
      if (this.data) {
        this.vehicleForm.patchValue({
          brand: this.data.brand,
          model: this.data.model,
          licensePlate: this.data.licensePlate,
          status: this.data.status,
          acquisitionDate: this.data.acquisitionDate,
          mileage: this.data.mileage,
          location: this.data.location,
          airConditioning: this.data.airConditioning,
          numberOfDoors: this.data.numberOfDoors,
          fuelType: this.data.fuelType,
          transmissionType: this.data.transmissionType,
        });

 if (this.isEditMode) {
      this.vehicleForm.get('brand')?.disable();
      this.vehicleForm.get('model')?.disable();
      this.vehicleForm.get('licensePlate')?.disable();
      this.vehicleForm.get('typeId')?.disable();
      this.vehicleForm.get('acquisitionDate')?.disable();
      this.vehicleForm.get('airConditioning')?.disable();
      this.vehicleForm.get('numberOfDoors')?.disable();
      this.vehicleForm.get('fuelType')?.disable();
      this.vehicleForm.get('transmissionType')?.disable();
    }
      }
    }

    private loadBrands(): void {
      this.vehicleService.getBrands().subscribe({
        next: (brands) => {
          this.brands = brands;
        },
        error: (err) => {
          console.error('Error al cargar marcas:', err);
        },
      });
    }

    onBrandChange(event: any): void {
      const selectedBrandName = event.value;
      const selectedBrand = this.brands.find(brand => brand.name === selectedBrandName);
    
      if (selectedBrand) {
        this.loadModels(selectedBrand.brandId);
      }
    }
  
    private loadModels(brandId: number): void {
      this.vehicleService.getModelsByBrand(brandId).subscribe({
        next: (models) => {
          this.models = models;
        },
        error: (err) => {
          console.error('Error al cargar modelos:', err);
        },
      });
    }


  private loadTypeVehicles(): void {
    this.typeVehicleService.getTypeVehicles().subscribe({
      next: (data) => {
        this.typeVehicles = data.map((type) => ({
          typeId: type.typeId,
          name: type.name,
        }));
        console.log('Tipos de vehículo cargados:', this.typeVehicles);
        if (this.data?.type) {
          const matchedType = this.typeVehicles.find(
            (type) => type.name.toLowerCase() === this.data.type.toLowerCase()
          );
          if (matchedType) {
            this.vehicleForm.get('typeId')?.setValue(matchedType.typeId);
          } else {
            console.warn('No se encontró un tipo de vehículo que coincida con:', this.data.type);
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar los tipos de vehículos:', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const newFiles = Array.from(input.files);
      this.images = [...this.images, ...newFiles];
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  save(): void {
    if (this.vehicleForm.valid) {
      const formValues = this.vehicleForm.getRawValue();
      console.log('Valores enviados:', formValues); // Para depurar
      this.dialogRef.close({ vehicle: formValues, images: this.images });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
