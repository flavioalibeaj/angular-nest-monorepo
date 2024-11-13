import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { ILoginRequest } from '../model/i-login-request.interface';
import { ILoginResponse } from '../model/i-login-response.interface';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../shared/model/i-api-response.interface';
import { AUTH_ENDPOINTS } from '../../shared/endpoints/endpoints';

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
          if (!response.isSuccessful) return;

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

  register() {}
}
