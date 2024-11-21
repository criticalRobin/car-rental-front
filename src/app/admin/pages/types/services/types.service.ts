import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Type } from '../models/type.model';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  getTypes(): Observable<Type[]> {
    const url: string = `${this.baseUrl}/type-vehicles`;

    const headers = this.getAuthHeaders();

    return this.http.get<Type[]>(url, { headers });
  }

  addType(type: Type): Observable<Type> {
    const url: string = `${this.baseUrl}/type-vehicles`;

    const headers = this.getAuthHeaders();

    return this.http.post<Type>(url, type, { headers });
  }

  updateType( updatedType: Partial<Type>): Observable<Type> {
    const url: string = `${this.baseUrl}/type-vehicles`;

    const headers = this.getAuthHeaders();

    return this.http.put<Type>(url, updatedType, { headers });
  }

  deleteType(typeId: number): Observable<void> {
    const url: string = `${this.baseUrl}/type-vehicles/${typeId}`;

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
