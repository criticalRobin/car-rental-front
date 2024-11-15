import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { ILoginRequest, ILoginResponse } from '../models/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  login(loginData: ILoginRequest): Observable<ILoginResponse> {
    const loginUrl: string = `${this.baseUrl}/auth/login`;
    const response: Observable<ILoginResponse> = this.http.post<ILoginResponse>(
      loginUrl,
      loginData
    );

    return response;
  }
}
