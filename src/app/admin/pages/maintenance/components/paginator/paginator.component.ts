import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports: [MatIconModule],
  standalone: true,
})

export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10; 
  @Input() currentPage: number = 0; 
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.pageChange.emit(this.currentPage);
    }
  }
}
