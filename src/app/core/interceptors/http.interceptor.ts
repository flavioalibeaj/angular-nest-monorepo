import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const spinnerService = inject(NgxSpinnerService);

  spinnerService.show();

  const setHeaders: { [key: string]: string } = {
    'Accept-Language': localStorage.getItem('language') ?? 'en',
    Timezone: JSON.stringify(new Date().getTimezoneOffset() / -60),
  };

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
        throw new Error(error.error?.message);
      })
    ),
    finalize(() => spinnerService.hide())
  );
};
