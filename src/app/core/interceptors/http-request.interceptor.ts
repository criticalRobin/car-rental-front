import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { LoadingService } from '@shared/services/loading.service';
import { finalize } from 'rxjs';

let totalRequests: number = 0;

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv: AuthService = inject(AuthService);
  const loadingSrv: LoadingService = inject(LoadingService);
  const { token } = authSrv.getLoggedUserFromLocalStorage();

  totalRequests++;
  loadingSrv.setLoading(true);

  const modifiedReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      })
    : req;

  return next(modifiedReq).pipe(
    finalize(() => {
      totalRequests--;

      if (totalRequests === 0) loadingSrv.setLoading(false);
    })
  );
};
