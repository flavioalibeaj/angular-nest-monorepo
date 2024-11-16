import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../services/spinner.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const snackbar = inject(MatSnackBar);
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  const clonedRequest = req.clone();

  if (authService.isLoggedIn()) {
    clonedRequest.headers.set('Authorization', authService.token() ?? '');
  }

  return next(clonedRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      snackbar.open(err.error.error.message, 'Close');
      return throwError(() => err);
    }),
    finalize(() => spinnerService.hide())
  );
};
