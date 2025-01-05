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
import { Return } from './models/return.model';
import { ReturnModalComponent } from './components/return-modal/return-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ReturnService } from './services/returns.service';
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
  selector: 'app-returns',
  standalone: true,
  imports: [MATERIAL, ReactiveFormsModule, SearchBarComponent, PaginatorComponent, CommonModule],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})

export class ReturnsComponent implements OnInit {
  private readonly returnService: ReturnService = inject(ReturnService);
  public returns: Return[] = [ ];
  public filteredReturn: Return[] = [];
  public paginatedRetuns: Return[] = [];
  pageSize: number = 4;
  currentPage: number = 0;
  public displayedColumns:string[]  = ['rentalId', 'clientIdNumber', 'returnDate', 'licensePlate', 'actions'];
  notificationService = inject(NotificationService);

  constructor(private dialog: MatDialog) {
    this.filteredReturn = [...this.returns];
    this.updatePagination();
  }

  ngOnInit(): void {
    this.checkPaymentSuccess();
    this.updatePagination();
    this.loadReturns();
    this.checkForPaymentConfirmation();
  }


  checkForPaymentConfirmation(): void {
    const sessionId = localStorage.getItem('sessionId');
    const rentalId = localStorage.getItem('rentalId');
    if (sessionId && rentalId) {
      setTimeout(() => {
        this.notificationService.activateNotification(
          'Pago confirmado exitosamente',
          StateNotification.SUCCESS
        );
      }, 10000); // 10 segundos
    }
  }

  
  loadReturns(): void {
    this.returnService.getReturnVehicles().subscribe({
      next: (data: Return[]) => {
        this.returns = data;
        this.filteredReturn = [...this.returns];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar los returns:', err);
      }
    });
  }

  checkPaymentSuccess(): void {
    const sessionId = localStorage.getItem('sessionId');
    const returnId = localStorage.getItem('rentalId');
    if (sessionId && returnId) {
      console.log('Iniciando confirmación de pago con sessionId:', sessionId, 'y returnId:', returnId);
      this.returnService.confirmPayment(sessionId, +returnId).subscribe({
        next: () => {
          console.log('Pago confirmado exitosamente');
          alert('Pago confirmado exitosamente');
          this.notificationService.activateNotification(
            'Pago confirmado exitosamente',
            StateNotification.SUCCESS
          );
          localStorage.removeItem('sessionId');
          localStorage.removeItem('rentalId');
        },
        error: (err) => {
          console.error('Error al confirmar el pago:', err);
        /*  this.notificationService.activateNotification(
            'Error al confirmar el pago',
            StateNotification.ERROR
          );*/
        },
      });
    }
  }
  
  onSearch(term: string): void {
    this.filteredReturn = this.returns.filter((ret) =>
      this.matchesSearch(ret, term)
    );
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRetuns = this.filteredReturn.slice(startIndex, endIndex);
  }


  private matchesSearch(returns: Return, term: string): boolean {
      if (!term) return true;
      term = term.toLowerCase();
      return (
        returns.rentalId.toString().includes(term) ||
        returns.clientIdNumber.toLowerCase().includes(term) ||
        returns.returnDate.toString().toLowerCase().includes(term) ||
        returns.licensePlate.toLowerCase().includes(term)
      );
    }

    onPageChange(page: number): void {
      this.currentPage = page;
      this.updatePagination();
    }

    returnVehicle(vehicle: Return) : void{
      
      const dialogRef = this.dialog.open(ReturnModalComponent, {
        width: '400px',
        data: vehicle 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Resultado del modal:', result);
        }
      });
    }
    

  
    
}
