import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from './services/vehicles.service';
import { Vehicle } from './models/vehicle.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatDialog } from '@angular/material/dialog';
import { VehicleModalComponent } from './components/vehicle-modal/vehicle-modal.component';
import { CommonModule } from '@angular/common';
import { TypeVehicleService } from './services/type-vehicle.service';
import { ImageUploadModalComponent } from './components/image-upload/image-upload-modal.component';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';
import { ConfirmDialogComponent } from '@shared/components/ConfirmDialogComponent/confirm.dialog.component';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
];

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  imports: [MATERIAL, ReactiveFormsModule, SearchBarComponent, PaginatorComponent, CommonModule],
  standalone: true,
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  paginatedVehicles: Vehicle[] = [];
  typeVehicles: any[] = [];
  displayedColumns: string[] = [
    'images',
    'brand',
    'model',
    'licensePlate',
    'typeId',
    'status',
    'acquisitionDate',
    'mileage',
    'location',
    'airConditioning',
    'numberOfDoors',
    'fuelType',
    'transmissionType',
    'actions'
  ];

  pageSize: number = 4;
  currentPage: number = 0;

  isLoading: boolean = true;
  token: string = '';
  searchControl: FormControl = new FormControl('');

  notificationService = inject(NotificationService);

  constructor(private vehicleService: VehicleService,
    private dialog: MatDialog,
    private typeVehicleService: TypeVehicleService,) { }

  ngOnInit(): void {
    const rawData = localStorage.getItem('loggedUser');
    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        const rawToken = parsedData.token || '';
        this.token = rawToken.replace('Bearer ', '');
      } else {
        this.token = 'No token available';
      }
    } catch (e) {
      console.error('Error al parsear el token:', e);
      this.token = 'Error al obtener el token';
    }

    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
        this.isLoading = false;
        this.updatePagination();
        this.loadTypeVehicles();
        this.loadTypeVehicles();
      },
      error: (err) => {
        console.error('Error al obtener los vehículos:', err);
        this.isLoading = false;
      }
    });
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedVehicles = this.filteredVehicles.slice(startIndex, endIndex);
  }

  loadTypeVehicles(): void {
    this.typeVehicleService.getTypeVehicles().subscribe({
      next: (data) => {
        this.typeVehicles = data;
      },
      error: (err) => {
        console.error('Error al cargar los tipos de vehículos:', err);
      },
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  openImageModal(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(ImageUploadModalComponent, {
      width: '500px',
      data: { vehicleId: vehicle.vehicleId, images: vehicle.images || [] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Imagen cargada para el vehículo:', vehicle.vehicleId);
        this.loadVehicles();
        this.updatePagination();
        this.loadTypeVehicles();
      }
    }

    );
  }

  editVehicle(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleModalComponent, {
      width: '600px',
      data: vehicle,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedVehicle = result.vehicle;

        this.vehicleService.editVehicle(vehicle.vehicleId, updatedVehicle).subscribe({
          next: (editedVehicle) => {
            this.notificationService.activateNotification(
              'Vehículo actualizado exitosamente',
              StateNotification.SUCCESS
            );
            const index = this.vehicles.findIndex((v) => v.vehicleId === editedVehicle.vehicleId);
            if (index !== -1) {
              this.vehicles[index] = editedVehicle;
              this.filteredVehicles = [...this.vehicles];
              this.updatePagination();
              this.loadTypeVehicles();
              this.loadVehicles();
            }
          },
          error: (err) => {
            console.error('Error al actualizar el vehículo:', err);
          },
        });

      }
    });
  }

  deleteVehicle(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar el vehículo con placa ${vehicle.licensePlate}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.deleteVehicle(vehicle.vehicleId).subscribe({
          next: () => {
            this.notificationService.activateNotification(
              `Vehículo con placa ${vehicle.licensePlate} eliminado exitosamente`,
              StateNotification.SUCCESS
            );
            this.vehicles = this.vehicles.filter(v => v.vehicleId !== vehicle.vehicleId);
            this.filteredVehicles = [...this.vehicles];
            this.updatePagination();
            this.loadVehicles();
            this.loadTypeVehicles();
          },
          error: (err) => {
            this.notificationService.activateNotification(
              `Ocurrió un error al eliminar el vehículo con placa ${vehicle.licensePlate}`,
              StateNotification.ERROR
            );
          },
        });
      }
    });
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar los vehículos:', err);
      },
    });
  }

  addVehicle(): void {
    const dialogRef = this.dialog.open(VehicleModalComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const vehicleData = result.vehicle;
        const images = result.images;

        this.vehicleService.addVehicle(vehicleData, images).subscribe({
          next: (newVehicle) => {
            this.notificationService.activateNotification(
              'Vehículo agregado exitosamente',
              StateNotification.SUCCESS
            );
            this.vehicles.push(newVehicle);
            this.filteredVehicles = [...this.vehicles];
            this.updatePagination();
            this.loadVehicles();
            this.loadTypeVehicles();
          },
          error: (err) => {
            this.notificationService.activateNotification(
              'Ocurrió un error al agregar el vehículo',
              StateNotification.ERROR
            );
            console.error('Error al agregar el vehículo:', err);
          },
        });
      }
    });
  }

  onSearch(term: string): void {
    this.filteredVehicles = this.vehicles.filter((vehicle) =>
      this.matchesSearch(vehicle, term)
    );
    this.currentPage = 0;
    this.updatePagination();
  }

  private matchesSearch(vehicle: Vehicle, term: string): boolean {
    if (!term) return true;
    term = term.toLowerCase();
    return (
      vehicle.brand.toLowerCase().includes(term) ||
      vehicle.model.toLowerCase().includes(term) ||
      vehicle.licensePlate.toLowerCase().includes(term)
    );
  }
}