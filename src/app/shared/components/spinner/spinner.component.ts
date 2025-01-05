import { Component, inject } from '@angular/core';
import { LoadingService } from '@shared/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

const MATERIAL = [MatProgressSpinnerModule];

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MATERIAL],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  protected readonly loadingSrv: LoadingService = inject(LoadingService);
}
