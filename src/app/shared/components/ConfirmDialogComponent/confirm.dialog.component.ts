import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="icon-container">
        <mat-icon class="warning-icon">warning</mat-icon>
      </div>
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
      <div class="actions">
        <button 
          mat-button 
          class="cancel-button"
          (click)="onNoClick()"
        >
          Cancelar
        </button>
        <button 
          mat-raised-button 
          class="confirm-button"
          (click)="onYesClick()"
        >
          Eliminar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 24px;
      text-align: center;
      background: white;
      border-radius: 8px;
      min-width: 320px;
    }

    .icon-container {
      background: rgba(255, 88, 65, 0.1);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }

    .warning-icon {
      font-size: 36px;
      height: 36px;
      width: 36px;
      color: #FF5841;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #222222;
      margin-bottom: 12px;
    }

    p {
      margin: 0;
      font-size: 16px;
      color: rgba(34, 34, 34, 0.7);
      line-height: 1.5;
    }

    .cancel-button {
      padding: 8px 24px;
      border: 2px solid #222222 !important;
      color: #222222 !important;
      font-weight: 500;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .cancel-button:hover {
      background: rgba(34, 34, 34, 0.05) !important;
    }

    .confirm-button {
      padding: 8px 24px;
      background: #FF5841 !important;
      color: white !important;
      font-weight: 500;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .confirm-button:hover {
      background: #C53678 !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(197, 54, 120, 0.2);
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}