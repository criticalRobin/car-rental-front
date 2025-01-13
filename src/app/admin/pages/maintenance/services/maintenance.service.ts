import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  getReturnVehicles(): Observable<Maintenance[]> {
    const catalogUrl: string = `${this.baseUrl}/vehicles/maintenance`;
    const response: Observable<Maintenance[]> =
      this.http.get<Maintenance[]>(catalogUrl);
    return response;
  }

  updateVehicleStatus(vehicleId: number): Observable<void> {
    const updateUrl: string = `${this.baseUrl}/vehicles/status/${vehicleId}`;
    return this.http.put<void>(updateUrl, {});
  }
}