import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const snackbar = inject(MatSnackBar);

  const clonedRequest = req.clone();

  if (authService.isLoggedIn()) {
    clonedRequest.headers.set('Authorization', authService.token() ?? '');
  }

  return next(clonedRequest).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        snackbar.open(err.error.error.message, 'Close');
      }
      return throwError(() => err);
    })
  );
};
