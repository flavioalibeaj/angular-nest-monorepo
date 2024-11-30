import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { SpinnerService } from '../../shared/services/spinner.service';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  const setHeaders: { [key: string]: string } = {};

  if (authService.isLoggedIn()) {
    setHeaders['Authorization'] = `Bearer ${authService.token()}`;
  }

  return next(
    req.clone({
      setHeaders,
    })
  ).pipe(
    catchError(({ error }: HttpErrorResponse) =>
      throwError(() => {
        if (!navigator.onLine) throw new Error('No access to the internet');
        throw new Error(error.error.message);
      })
    ),
    finalize(() => spinnerService.hide())
  );
};
