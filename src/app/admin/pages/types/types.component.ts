import { Component, inject, OnInit } from '@angular/core';
import { TypeService } from './services/types.service';
import { Type } from './models/type.model';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TypeModalComponent } from './components/type-modal/type-modal.component'; 
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
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
  imports: [MATERIAL, CommonModule, SearchBarComponent, PaginatorComponent],
  standalone: true
})
export class TypesVehiclesComponent implements OnInit {
  types: Type[] = [];
  filteredTypes: Type[] = [];
  paginatedType: Type[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  searchControl: FormControl = new FormControl('');
  pageSize: number = 4;
  currentPage: number = 0;
  notificacionService = inject(NotificationService);
  constructor(private typeService: TypeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTypes();

    this.searchControl.valueChanges.subscribe((term) => {
      this.onSearch(term);
    });
  }

  loadTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (data) => {
        this.types = data;
        this.filteredTypes = [...this.types];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar los tipos de vehículos:', err);
      },
    });
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedType = this.filteredTypes.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onSearch(term: string): void {
    this.filteredTypes = this.types.filter((type) =>
      type.name.toLowerCase().includes(term.toLowerCase())
    );
    this.currentPage = 0;
    this.updatePagination();
  }

  addType(): void {
    const dialogRef = this.dialog.open(TypeModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.typeService.addType(result).subscribe({
          next: (newType) => {
            this.types.push(newType);
            this.filteredTypes = [...this.types];
            this.updatePagination();
            this.notificacionService.activateNotification(
              'Tipo agregado exitosamente.',
              StateNotification.SUCCESS
            );
          },
          error: (err) => {
            console.error('Error al agregar el tipo:', err);
          },
        });
      }
    });
  }

    editType(type: Type): void {
    const dialogRef = this.dialog.open(TypeModalComponent, {
      width: '500px',
      data: type, 
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedType: Type = {
          typeId: type.typeId,
          name: result.name,
          description: result.description,
        };
  
        this.typeService.updateType(updatedType).subscribe({
          next: (updatedTypeResponse) => {
            const index = this.types.findIndex((t) => t.typeId === updatedTypeResponse.typeId);
            if (index !== -1) {
              this.types[index] = updatedTypeResponse;
              this.filteredTypes = [...this.types];
              this.updatePagination();
              this.notificacionService.activateNotification(
                'Tipo actualizado exitosamente.',
                StateNotification.SUCCESS
              );
            }
          },
          error: (err) => {
            console.error('Error al actualizar el tipo:', err);
            this.notificacionService.activateNotification(
              'Error al actualizar el tipo.',
              StateNotification.ERROR
            );
          },
        });
      }
    });
  }

  deleteType(type: Type): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el tipo "${type.name}"?`)) {
      this.typeService.deleteType(type.typeId).subscribe({
        next: () => {
          this.types = this.types.filter((t) => t.typeId !== type.typeId);
          this.filteredTypes = [...this.types];
          this.updatePagination();
          this.notificacionService.activateNotification(
            'Tipo eliminado exitosamente.',
            StateNotification.SUCCESS
          );
        },
        error: (err) => {
          console.error('Error al eliminar el tipo:', err);
        },
      });
    }
  }
}
