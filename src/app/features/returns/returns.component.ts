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
  public returns: Return[] = [ 
    { rentalId: 1, clientIdNumber: '123456789', returnDate: new Date('2024-05-05'), licensePlate: 'ABC123' },
    { rentalId: 2, clientIdNumber: '987654321', returnDate: new Date('2024-05-05'), licensePlate: 'XYZ987' },
    { rentalId: 3, clientIdNumber: '456789123', returnDate: new Date('2024-05-05'), licensePlate: 'LMN456' },
    { rentalId: 4, clientIdNumber: '321654987', returnDate: new Date('2024-05-05'), licensePlate: 'QWE321' },
  ];
  public filteredReturn: Return[] = [];
  public paginatedRetuns: Return[] = [];
  pageSize: number = 4;
  currentPage: number = 0;
  public displayedColumns:string[]  = ['rentalId', 'clientIdNumber', 'returnDate', 'licensePlate', 'actions'];

  constructor(private dialog: MatDialog) {
    this.filteredReturn = [...this.returns];
    this.updatePagination();
  }

  ngOnInit(): void {
    this.checkPaymentSuccess();
    this.updatePagination();
    this.loadReturns();
  }

  loadReturns(): void {
   /* this.returnService.getReturnVehicles().subscribe({
      next: (data: Return[]) => {
        this.returns = data;
        this.filteredReturn = [...this.returns];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al cargar los returns:', err);
      }
    });
   */
    this.updatePagination();
  }


  checkPaymentSuccess(): void {
    const sessionId = localStorage.getItem('sessionId');
    const returnId = localStorage.getItem('returnId');
    if (sessionId && returnId) {
      this.returnService.confirmPayment(sessionId, +returnId).subscribe({
        next: () => {
          console.log('Pago confirmado exitosamente');
          alert('Pago confirmado exitosamente');
          localStorage.removeItem('sessionId');
          localStorage.removeItem('returnId');
        },
        error: (err) => {
          console.error('Error al confirmar el pago:', err);
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
