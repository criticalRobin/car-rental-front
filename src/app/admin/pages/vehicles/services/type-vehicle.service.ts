import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeVehicleService {
  private baseUrl: string = 'https://proyecto-alquiler-vehiculos.onrender.com';
  private readonly http: HttpClient = inject(HttpClient);

  getTypeVehicles(): Observable<any[]> {
    const url: string = `${this.baseUrl}/type-vehicles`;

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

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http.get<any[]>(url, { headers });
  }
}
