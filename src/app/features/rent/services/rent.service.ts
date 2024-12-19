import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IRent } from '../models/rent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  createRent(rentData: IRent): Observable<IRent> {
    const createRentUrl: string = `${this.baseUrl}/rentals`;
    const response: Observable<IRent> = this.http.post<IRent>(
      createRentUrl,
      rentData
    );

    return response;
  }
}
