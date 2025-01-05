import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IRentalList } from '../../rental-list/models/rental-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalStatusService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  listRentals(): Observable<IRentalList[]> {
    const rentaStatusUrl: string = `${this.baseUrl}/rentals`;
    const response: Observable<IRentalList[]> =
      this.http.get<IRentalList[]>(rentaStatusUrl);

    return response;
  }

  updateRentalStatus(rentalId: number): Observable<void> {
    const rentaStatusUrl: string = `${this.baseUrl}/rentals/${rentalId}`;
    const status = 'APPROVED';
    const response: Observable<void> = this.http.put<void>(rentaStatusUrl, {
      status,
    });

    return response;
  }
}
