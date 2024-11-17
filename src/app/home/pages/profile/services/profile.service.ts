import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { PROFILE_ENDPOINTS } from '../../../../shared/endpoints/endpoints';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginResponse } from '../../../../auth/model/i-login-response.interface';
import { ICreateProfile } from '../model/i-create-profile.interface';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly #httpService = inject(HttpService);
  readonly #userService = inject(UserService);
  readonly #authservice = inject(AuthService);
  readonly #router = inject(Router);

  createProfile(fg: ICreateProfile) {
    return this.#httpService
      .post<ICreateProfile, ILoginResponse>(PROFILE_ENDPOINTS.createProfile, fg)
      .pipe(
        tap(({ data }) => {
          if (!data) return;

          const { accessToken, id, username, profileId } = data;

          this.#authservice.setToken(accessToken);
          this.#userService.setUser({
            id,
            username,
            profileId,
          });

          this.#router.navigate(['']);
        })
      );
  }
}
