import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv: AuthService = inject(AuthService);
  const { token } = authSrv.getLoggedUserFromLocalStorage();

  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),
    });
    return next(modifiedReq);
  }

  return next(req);
};
