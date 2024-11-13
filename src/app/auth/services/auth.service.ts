import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { ILoginRequest } from '../model/i-login-request.interface';
import { ILoginResponse } from '../model/i-login-response.interface';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../shared/model/i-api-response.interface';
import { AUTH_ENDPOINTS } from '../../shared/endpoints/endpoints';
import { IRegisterRequest } from '../model/i-register-request.interface';
import { IRegisterResponse } from '../model/i-register-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #httpService = inject(HttpService);

  readonly #token = signal<string | null>(localStorage.getItem('access_token'));
  readonly token = this.#token.asReadonly();
  readonly isLoggedIn = computed(() => !!this.#token());

  logout() {
    this.#setToken(null);
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

          const route = response.data?.profileId ? '' : 'profile/create';
          this.#router.navigate([route]);
        })
      );
  }

  #setToken(token: string | null): void {
    this.#token.set(token);
    token ? localStorage.setItem('access_token', token) : localStorage.clear();
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
}
