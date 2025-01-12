import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IRegisterRequest } from '../models/register.interface';
import { Observable, tap } from 'rxjs';
import { IUser } from '@core/auth/models/user.interface';
import { auth } from 'firebase-config';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  register(registerData: IRegisterRequest): Observable<IUser> {
    const registerUrl: string = `${this.baseUrl}/users`;
    const response: Observable<IUser> = this.http.post<IUser>(
      registerUrl,
      registerData
    ).pipe(
      tap(async (response) => {
        console.log('Respuesta del backend:', response);
        
        try {
          // Iniciamos sesión con el email y password para obtener el usuario
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(
            auth,
            registerData.email,
            registerData.password
          );
          
          // Enviamos el correo de verificación
          await sendEmailVerification(userCredential.user);
          console.log('Correo de verificación enviado');
        } catch (error) {
          console.error('Error al enviar correo:', error);
        }
      })
    );

    return response;
  }
}