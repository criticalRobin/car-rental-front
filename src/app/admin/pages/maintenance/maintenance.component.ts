import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Maintenance } from './models/maintenance.model';
import { MaintenanceService } from './services/maintenance.service';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
];

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [MATERIAL, ReactiveFormsModule, SearchBarComponent, PaginatorComponent, CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})

export class MaintenanceComponent implements OnInit {
  private readonly maintenanceService: MaintenanceService = inject(MaintenanceService);
  public maintenances: Maintenance[] = [];
  public filteredMaintenance: Maintenance[] = [];
  public paginatedMaintenance: Maintenance[] = [];
  pageSize: number = 4;
  currentPage: number = 0;
  public displayedColumns: string[] = ['vehicleId', 'brand', 'model', 'licensePlate', 'actions'];
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  constructor(private dialog: MatDialog) {
    this.filteredMaintenance = [...this.maintenances];
    this.updatePagination();
  }

  ngOnInit(): void {
    this.loadMaintenances();
    this.updatePagination();
  }

  loadMaintenances(): void {
    this.maintenanceService.getReturnVehicles().subscribe({
      next: (data: Maintenance[]) => {
        this.maintenances = data;
        this.filteredMaintenance = [...this.maintenances];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar los mantenimientos:', err);
      }
    });
  }

  onSearch(term: string): void {
    this.filteredMaintenance = this.maintenances.filter((maintenance) =>
      this.matchesSearch(maintenance, term)
    );
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMaintenance = this.filteredMaintenance.slice(startIndex, endIndex);
  }

  private matchesSearch(maintenance: Maintenance, term: string): boolean {
    if (!term) return true;
    term = term.toLowerCase();
    return (
      maintenance.vehicleId.toString().includes(term) ||
      maintenance.brand.toLowerCase().includes(term) ||
      maintenance.model.toLowerCase().includes(term) ||
      maintenance.licensePlate.toLowerCase().includes(term)
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  updateVehicleStatus(vehicleId: number): void {
    this.maintenanceService.updateVehicleStatus(vehicleId).subscribe({
      next: () => {
        console.log('Estado del vehículo actualizado exitosamente');
        this.loadMaintenances(); // Recargar la lista después de actualizar
        this.notificationSrv.activateNotification(
          'Auto Disponible',
          StateNotification.SUCCESS
        );
      },
      error: (err) => {
        console.error('Error al actualizar el estado del vehículo:', err);
      }
    });
  }
}