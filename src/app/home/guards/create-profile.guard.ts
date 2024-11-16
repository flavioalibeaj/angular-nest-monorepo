import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

export const createProfileGuard: CanActivateFn = ({ data }) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const openWithProfileId: boolean = (data as { openWithProfileId: boolean })
    .openWithProfileId;

  const profileId = userService.user()?.profileId;

  if (openWithProfileId) {
    if (profileId) return true;

    router.navigate(['create-profile']);
    return false;
  }

  if (!profileId) return true;

  router.navigate(['']);
  return false;
};
