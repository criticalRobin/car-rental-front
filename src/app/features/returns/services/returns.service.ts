import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Return } from '../models/return.model';

@Injectable({
  providedIn: 'root',
})
export class ReturnService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  getReturnVehicles(): Observable<Return[]> {
    const catalogUrl: string = `${this.baseUrl}/returns`;
    const response: Observable<Return[]> =
      this.http.get<Return[]>(catalogUrl);
    return response;
  }

  sendReturnWithoutDamage(returnData: { rentalId: number, returnDate: string, lateFee: number }): Observable<any> {
    const url = `${this.baseUrl}/returns/without-damage`;
    return this.http.post(url, returnData);
  }

  sendReturnWithDamage(returnData: { 
    rentalId: number; 
    returnDate: string; 
    returnDetails: { partName: string; status: string; damageCost: number }[] 
  }): Observable<any> {
    const url = `${this.baseUrl}/returns/with-damage`;
    return this.http.post(url, returnData);
  }

  initiateStripePayment(paymentData: { 
    rentalId: number; 
    amount: number; 
    successUrl: string; 
    cancelUrl: string; 
    typePayment: string; 
  }): Observable<{ sessionId: string; url: string }> {
    const url = `${this.baseUrl}/stripe/checkout-session`;
    return this.http.post<{ sessionId: string; url: string }>(url, paymentData);
  }
  
  confirmPayment(sessionId: string, returnId: number): Observable<any> {
    const url = `${this.baseUrl}/returns/payment`;
    const payload = { sessionId, returnId };
    return this.http.post(url, payload);
  }
}
