import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const createProfileGuard: CanActivateFn = ({ data }) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const openWithProfileId: boolean = (data as { openWithProfileId: boolean })
    .openWithProfileId;

  const profileId = authService.user()?.profileId;

  if (openWithProfileId) {
    if (profileId) return true;

    router.navigate(['create-profile']);
    return false;
  }

  if (profileId) {
    router.navigate(['']);
    return false;
  }

  return true;
};
