import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IPayment, IPaymentResponse } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  pay(payment: IPayment): Observable<IPaymentResponse> {
    const paymentUrl: string = `${this.baseUrl}/stripe/checkout-session`;
    const response: Observable<IPaymentResponse> =
      this.http.post<IPaymentResponse>(paymentUrl, payment);

    return response;
  }

  savePayment(sessionId: string): Observable<void> {
    console.log('sessionId', sessionId);
    const paymentUrl: string = `${this.baseUrl}/rentals/payment`;
    const response: Observable<void> = this.http.post<void>(paymentUrl, {
      sessionId,
    });

    return response;
  }
}
