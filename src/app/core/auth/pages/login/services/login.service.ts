import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { ILoginRequest, ILoginResponse } from '../models/login.interface';
import { Observable, from, switchMap, firstValueFrom } from 'rxjs';
import { AuthService } from '@core/auth/services/auth.service';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authSrv: AuthService = inject(AuthService);

  login(loginData: ILoginRequest): Observable<ILoginResponse> {
    const loginUrl: string = `${this.baseUrl}/auth/login`;
    
    return from(
      signInWithEmailAndPassword(getAuth(), loginData.email, loginData.password)
    ).pipe(
      switchMap(async (userCredential) => {
        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          throw new Error('Por favor verifica tu correo electrónico. Se ha enviado un nuevo correo de verificación.');
        }
        
        const response = await firstValueFrom(
          this.http.post<ILoginResponse>(loginUrl, loginData)
        );
        
        if (!response) {
          throw new Error('Error en el inicio de sesión');
        }
        
        return response;
      })
    );
  }

  logout(): void {
    this.authSrv.removeLoggedUserFromLocalStorage();
  }
}