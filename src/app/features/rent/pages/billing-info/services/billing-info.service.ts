import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IBillingInfo } from '../models/billing-info';

@Injectable({
  providedIn: 'root',
})
export class BillingInfoService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  public getBillingInfo(userEmail: string): Observable<IBillingInfo[]> {
    const billingInfoUrl: string = `${this.baseUrl}/clients/user/${userEmail}`;
    const response: Observable<IBillingInfo[]> =
      this.http.get<IBillingInfo[]>(billingInfoUrl);

    return response;
  }

  public createBillingInfo(
    billingInfo: IBillingInfo
  ): Observable<IBillingInfo> {
    const billingInfoUrl: string = `${this.baseUrl}/clients`;
    const response: Observable<IBillingInfo> = this.http.post<IBillingInfo>(
      billingInfoUrl,
      billingInfo
    );

    return response;
  }
}
