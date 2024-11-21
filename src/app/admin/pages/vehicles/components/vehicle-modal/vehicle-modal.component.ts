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

  constructor(
    private fb: FormBuilder,
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
      acquisitionDate: ['', Validators.required],
      mileage: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      airConditioning: [false],
      numberOfDoors: [4, [Validators.required, Validators.min(1)]],
      fuelType: ['', Validators.required],
      transmissionType: ['', Validators.required],
    });
  }

 /* ngOnInit(): void {
    console.log('Datos recibidos:', this.data); // Verifica que `typeId` esté presente

    this.loadTypeVehicles();

    // Si estamos editando, inicializa el formulario con los datos
    if (this.data) {
      this.vehicleForm.patchValue({
        brand: this.data.brand,
        model: this.data.model,
        licensePlate: this.data.licensePlate,
        typeId: this.data.typeId, // Se actualizará después de cargar los tipos
        status: this.data.status,
        acquisitionDate: this.data.acquisitionDate,
        mileage: this.data.mileage,
        location: this.data.location,
        airConditioning: this.data.airConditioning,
        numberOfDoors: this.data.numberOfDoors,
        fuelType: this.data.fuelType,
        transmissionType: this.data.transmissionType,
      });
    }
  }*/


    ngOnInit(): void {
      console.log('Datos recibidos:', this.data); 
    
      this.loadTypeVehicles();
    
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
      }
    }

 /* private loadTypeVehicles(): void {
    this.typeVehicleService.getTypeVehicles().subscribe({
      next: (data) => {
        console.log('Tipos de vehículo cargados:', data);

        this.typeVehicles = data.map((type) => ({
          typeId: type.typeId,
          name: type.name,
        }));
        
        if (this.data?.typeId) {
          console.log('typeId recibido:', this.data.typeId);
          this.vehicleForm.get('typeId')?.setValue(this.data.typeId);
        }

        // Parchear el formulario con typeId después de cargar los tipos
        if (this.data?.typeId) {
          const matchedType = this.typeVehicles.find(
            (type) => type.typeId === this.data.typeId
          );
          if (matchedType) {
            this.vehicleForm.get('typeId')?.setValue(matchedType.typeId);
          } else {
            console.warn('El typeId no coincide con los tipos disponibles.');
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar los tipos de vehículos:', err);
      },
    });
  }
  */

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
      this.dialogRef.close({ vehicle: formValues, images: this.images });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
