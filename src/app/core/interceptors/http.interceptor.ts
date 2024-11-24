import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../shared/services/spinner.service';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const snackbar = inject(MatSnackBar);
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
    catchError((err: HttpErrorResponse) => {
      snackbar.open(err.error.error.message, 'Close');
      return throwError(() => err);
    }),
    finalize(() => spinnerService.hide())
  );
};
