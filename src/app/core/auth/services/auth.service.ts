import { Injectable } from '@angular/core';
import { ILoginResponse } from '../pages/login/models/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveLoggedUserInLocalStorage(loggedUser: ILoginResponse): void {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }
}
