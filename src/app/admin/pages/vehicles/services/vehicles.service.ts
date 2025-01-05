import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  getVehicles(): Observable<Vehicle[]> {
    const url: string = `${this.baseUrl}/vehicles`;

    const headers = this.getAuthHeaders();

    return this.http.get<Vehicle[]>(url, { headers });
  }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehicles/brands`);
  }


  
  getModelsByBrand(brandId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehicles/models/${brandId}`);
  }


    addVehicle(vehicle: Partial<Vehicle>, images: File[]): Observable<Vehicle> {
      const url: string = `${this.baseUrl}/vehicles`;
      const headers = this.getAuthHeaders();
    
      const formData: FormData = new FormData();
      formData.append('brand', vehicle.brand || '');
      formData.append('model', vehicle.model || '');
      formData.append('licensePlate', vehicle.licensePlate || '');
      formData.append('typeId', vehicle.typeId?.toString() || '');
      formData.append('status', vehicle.status || '');
      formData.append('acquisitionDate', vehicle.acquisitionDate || '');
      formData.append('mileage', vehicle.mileage?.toString() || '');
      formData.append('location', vehicle.location || '');
      formData.append('airConditioning', vehicle.airConditioning ? 'true' : 'false');
      formData.append('numberOfDoors', vehicle.numberOfDoors?.toString() || '');
      formData.append('fuelType', vehicle.fuelType || '');
      formData.append('transmissionType', vehicle.transmissionType || '');
    
      if (images && images.length > 0) {
        images.forEach((file, index) => {
          formData.append(`images`, file, file.name);
        });
      }
    
      return this.http.post<Vehicle>(url, formData, { headers });
    }
    

  editVehicle(vehicleId: number, updatedVehicle: Partial<Vehicle>): Observable<Vehicle> {
    const url: string = `${this.baseUrl}/vehicles/${vehicleId}`;

    const headers = this.getAuthHeaders();

    return this.http.put<Vehicle>(url, updatedVehicle, { headers });
  }

  deleteVehicle(vehicleId: number): Observable<void> {
    const url: string = `${this.baseUrl}/vehicles/${vehicleId}`;

    const headers = this.getAuthHeaders();

    return this.http.delete<void>(url, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const rawData = localStorage.getItem('loggedUser');
    let token = '';

    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        const rawToken = parsedData.token || '';
        token = rawToken.replace('Bearer ', ''); 
      }
    } catch (e) {
      console.error('Error al parsear el token:', e);
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
  }
}
