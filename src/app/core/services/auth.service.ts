import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../shared/model/i-api-response.interface';
import { AUTH_ENDPOINTS } from '../../shared/endpoints/endpoints';
import { IRegisterResponse } from '../../auth/model/i-register-response.interface';
import { ILoginResponse } from '../../auth/model/i-login-response.interface';
import { ILoginRequest } from '../../auth/model/i-login-request.interface';
import { IRegisterRequest } from '../../auth/model/i-register-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #httpService = inject(HttpService);

  readonly #token = signal<string | null>(localStorage.getItem('access_token'));
  readonly token = this.#token.asReadonly();

  readonly #user = signal<IRegisterResponse | null>(
    localStorage.getItem('current_user')
      ? JSON.parse(localStorage.getItem('current_user')!)
      : null
  );
  readonly user = this.#user.asReadonly();

  readonly isLoggedIn = computed(() => !!this.#token() && !!this.user());

  logout() {
    this.#setToken(null);
    this.#setUser(null);
    this.#router.navigate(['auth']);
  }

  login(body: ILoginRequest): Observable<IApiResponse<ILoginResponse>> {
    return this.#httpService
      .post<ILoginRequest, IApiResponse<ILoginResponse>>(
        AUTH_ENDPOINTS.login,
        body
      )
      .pipe(
        tap((response) => {
          this.#setToken(response.data?.accessToken ?? null);
          this.#setUser(
            response.data
              ? {
                  id: response.data?.id,
                  username: response.data.username,
                  profileId: response.data.profileId,
                }
              : null
          );

          const route = response.data?.profileId ? '' : 'create-profile';
          this.#router.navigate([route]);
        })
      );
  }

  register({ confirmPassword, password, username }: IRegisterRequest) {
    if (confirmPassword !== password) return;
    // TODO add global error handler to handle client side errors

    return this.#httpService
      .post<ILoginRequest, IRegisterResponse>(AUTH_ENDPOINTS.register, {
        password,
        username,
      })
      .pipe(tap(() => this.#router.navigate(['auth/login'])));
  }

  #setToken(token: string | null): void {
    this.#token.set(token);
    token
      ? localStorage.setItem('access_token', token)
      : localStorage.removeItem('access_token');
  }

  #setUser(user: IRegisterResponse | null) {
    this.#user.set(user);
    user
      ? localStorage.setItem('current_user', JSON.stringify(user))
      : localStorage.removeItem('current_user');
  }
}
