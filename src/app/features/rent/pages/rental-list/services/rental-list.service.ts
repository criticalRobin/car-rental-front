import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IRentalList } from '../models/rental-list';

@Injectable({
  providedIn: 'root',
})
export class RentalListService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  listRentals(userEmail: string): Observable<IRentalList[]> {
    const rentalListUrl: string = `${this.baseUrl}/rentals/${userEmail}`;
    const resonse: Observable<IRentalList[]> =
      this.http.get<IRentalList[]>(rentalListUrl);

    return resonse;
  }
}
