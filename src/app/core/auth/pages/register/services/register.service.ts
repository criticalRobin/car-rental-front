import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IRegisterRequest } from '../models/register.interface';
import { Observable } from 'rxjs';
import { IUser } from '@core/auth/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  register(registerData: IRegisterRequest): Observable<IUser> {
    const registerUrl: string = `${this.baseUrl}/auth/register`;
    const response: Observable<IUser> = this.http.post<IUser>(
      registerUrl,
      registerData
    );

    return response;
  }
}
