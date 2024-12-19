import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { ICatalogVehicle } from '../models/catalog-vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  getCatalogVehicles(): Observable<ICatalogVehicle[]> {
    const catalogUrl: string = `${this.baseUrl}/vehicles/available`;
    const response: Observable<ICatalogVehicle[]> =
      this.http.get<ICatalogVehicle[]>(catalogUrl);

    return response;
  }

  saveCatalogInLocalStorage(vehicles: ICatalogVehicle[]): void {
    localStorage.setItem('catalog', JSON.stringify(vehicles));
  }

  getCatalogFromLocalStorage(): ICatalogVehicle[] {
    const catalog: ICatalogVehicle[] = JSON.parse(
      localStorage.getItem('catalog') || '{}'
    );

    return catalog;
  }
}
