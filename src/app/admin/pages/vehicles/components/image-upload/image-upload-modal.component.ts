import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule
  ]
})
export class ImageUploadModalComponent {
  imageForm: FormGroup;
  vehicleId: number;
  images: { imageId: number; imageUrl: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ImageUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: number; images: any[] }
  ) {
    this.vehicleId = data.vehicleId;
    this.images = data.images || [];
    this.imageForm = this.fb.group({
      files: [null],
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files); 
      this.imageForm.patchValue({ files });
    } else {
      this.imageForm.patchValue({ files: null }); 
    }
  }
  
  uploadImage(): void {
    const files = this.imageForm.get('files')?.value;
  
    if (files && files.length > 0) {
      const formData = new FormData();
  
      files.forEach((file: File) => {
        formData.append('images', file); 
      });
  
      const url = `https://proyecto-alquiler-vehiculos.onrender.com/vehicles/${this.vehicleId}`;
  
      const rawData = localStorage.getItem('loggedUser');
      let token = '';
      try {
        if (rawData) {
          const parsedData = JSON.parse(rawData);
          const rawToken = parsedData.token || '';
          token = rawToken; 
        }
      } catch (e) {
        console.error('Error al obtener el token:', e);
        alert('Error al obtener el token. Intenta nuevamente.');
        return;
      }
  
      const headers = {
        Authorization: token,
      };
  
      this.http.post(url, formData, { headers }).subscribe({
        next: () => {
          alert('Imágenes cargadas exitosamente.');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al cargar las imágenes:', err);
          alert('Ocurrió un error al cargar las imágenes. Intenta nuevamente.');
        },
      });
    } else {
      alert('Por favor, selecciona al menos una imagen.');
    }
  }
  
  deleteImage(imageId: number): void {
    const url = `https://proyecto-alquiler-vehiculos.onrender.com/vehicles/images/${imageId}`;
    const headers = this.getAuthHeaders();

    if (confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      this.http.delete(url, { headers }).subscribe({
        next: () => {
          alert('Imagen eliminada exitosamente.');
          this.images = this.images.filter((image) => image.imageId !== imageId);
        },
        error: (err) => {
          console.error('Error al eliminar la imagen:', err);
          alert('Ocurrió un error al eliminar la imagen. Intenta nuevamente.');
        },
      });
    }
  }

  private getAuthHeaders(): any {
    const rawData = localStorage.getItem('loggedUser');
    let token = '';
    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        token = parsedData.token || '';
      }
    } catch (e) {
      console.error('Error al obtener el token:', e);
    }
    return {
      Authorization: token,
    };
  }


  close(): void {
    this.dialogRef.close(true);
  }
}
