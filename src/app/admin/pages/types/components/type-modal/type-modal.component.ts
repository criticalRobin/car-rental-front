import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Type } from '../../models/type.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]

})
export class TypeModalComponent implements OnInit {
  typeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Type | null // `null` si es agregar, o el objeto si es editar
  ) {
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Si estamos editando, inicializar el formulario con los datos del tipo
    if (this.data) {
      this.typeForm.patchValue({
        name: this.data.name,
        description: this.data.description,
      });
    }
  }

  save(): void {
    if (this.typeForm.valid) {
      this.dialogRef.close(this.typeForm.getRawValue());
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
