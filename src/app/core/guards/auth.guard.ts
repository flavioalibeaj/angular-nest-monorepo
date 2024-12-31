import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const routeData = route.data as RouteData | undefined;
  const openWhenAuthenticated = routeData?.openWhenAuthenticated ?? false;
  const isLoggedIn = authService.isLoggedIn();

  if (!openWhenAuthenticated) {
    if (!isLoggedIn) return true;

    router.navigate(['']);
    return false;
  }

  if (isLoggedIn) return true;

  authService.logout();
  return false;
};

interface RouteData {
  openWhenAuthenticated: boolean;
}
