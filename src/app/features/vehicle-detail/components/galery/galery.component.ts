import { Component, input, InputSignal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

const MATERIAL = [MatTabsModule];

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css',
})
export class GaleryComponent {
  public images: InputSignal<string[]> = input.required<string[]>();
}
