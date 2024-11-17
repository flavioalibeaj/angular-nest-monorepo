import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../shared/model/i-api-response.interface';
import { AUTH_ENDPOINTS } from '../../shared/endpoints/endpoints';
import { ILoginResponse } from '../../auth/model/i-login-response.interface';
import { ILoginRequest } from '../../auth/model/i-login-request.interface';
import { IRegisterRequest } from '../../auth/model/i-register-request.interface';
import { UserService } from './user.service';
import { IViewUser } from '../model/i-view-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #httpService = inject(HttpService);
  readonly #userService = inject(UserService);

  readonly #token = signal<string | null>(localStorage.getItem('access_token'));
  readonly token = this.#token.asReadonly();

  readonly isLoggedIn = computed(
    () => !!this.#token() && !!this.#userService.user()
  );

  constructor() {
    effect(() => {
      const token = this.#token();

      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    });
  }

  logout() {
    this.setToken(null);
    this.#userService.setUser(null);
    this.#router.navigate(['auth']);
  }

  login(body: ILoginRequest): Observable<IApiResponse<ILoginResponse>> {
    return this.#httpService
      .post<ILoginRequest, ILoginResponse>(AUTH_ENDPOINTS.login, body)
      .pipe(
        tap(({ data }) => {
          if (!data) return;
          const { accessToken, id, username, profileId } = data;

          this.setToken(accessToken);
          this.#userService.setUser({
            id,
            username,
            profileId,
          });

          this.#router.navigate([profileId ? '' : 'create-profile']);
        })
      );
  }

  register({ confirmPassword, password, username }: IRegisterRequest) {
    if (confirmPassword !== password)
      throw new Error('Confirm password must match password');

    return this.#httpService
      .post<ILoginRequest, IViewUser>(AUTH_ENDPOINTS.register, {
        password,
        username,
      })
      .pipe(tap(() => this.#router.navigate(['auth/login'])));
  }

  setToken(token: string | null): void {
    this.#token.set(token);
  }
}
