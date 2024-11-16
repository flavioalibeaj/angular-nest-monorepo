import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const openWhenAuthenticated = (<RouteData>route.data).openWhenAuthenticated;

  if (!openWhenAuthenticated) {
    if (!authService.isLoggedIn()) return true;

    router.navigate(['']);
    return false;
  }

  if (authService.isLoggedIn()) return true;

  authService.logout();
  return false;
};

interface RouteData {
  openWhenAuthenticated: boolean;
}
