import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { EMPTY, from, Observable, switchMap, take, tap } from 'rxjs';
import { IApiResponse } from '../../shared/model/i-api-response.interface';
import { AUTH_ENDPOINTS } from '../../shared/endpoints/endpoints';
import { ILoginResponse } from '../../auth/model/i-login-response.interface';
import { ILoginRequest } from '../../auth/model/i-login-request.interface';
import { IRegisterRequest } from '../../auth/model/i-register-request.interface';
import { UserService } from './user.service';
import { IViewUser } from '../model/i-view-user.interface';
import { jwtDecode } from 'jwt-decode';
import { ITokenPayload } from '../model/i-token-payload.interface';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #httpService = inject(HttpService);
  readonly #userService = inject(UserService);
  readonly #translateService = inject(TranslateService);
  readonly #ngxPermissions = inject(NgxPermissionsService);

  // Reactive signal to hold the access token, initialized with a value from localStorage.
  readonly #token = signal<string | null>(localStorage.getItem('access_token'));
  // Exposing the token signal as a readonly observable.
  readonly token = this.#token.asReadonly();

  // Computed property to determine if the user is logged in.
  readonly isLoggedIn = computed(
    () =>
      !!this.#token() && !this.#isTokenExpired() && !!this.#userService.user()
  );

  constructor() {
    // Reactive effect to synchronize the token signal with localStorage.
    effect(() => {
      const token = this.#token();

      let permissions: string[] = [];

      if (token) {
        localStorage.setItem('access_token', token);

        const parsedToken = this.#parseToken();
        permissions = !parsedToken?.permissions ? [] : parsedToken.permissions;
      } else {
        localStorage.removeItem('access_token');
      }

      this.#ngxPermissions.loadPermissions(permissions);
    });
  }

  /**
   * Logs out the user by clearing the token and user data, and navigating to the authentication page.
   */
  logout() {
    this.setToken(null);
    this.#userService.setUser(null);
    this.#router.navigate(['auth']);
  }

  /**
   * Logs in the user by sending a login request with the provided credentials.
   * Updates the token and user data on successful login and navigates the user accordingly.
   * @param body - The login request payload of type ILoginRequest.
   * @returns An Observable emitting the API response containing the login data.
   */
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

  /**
   * Registers a new user. Validates password and confirmPassword before sending the request.
   * Navigates to the login page upon successful registration.
   * @param param - Registration details containing username, password, and confirmPassword.
   * @returns An Observable emitting the API response for user registration.
   */
  register({ confirmPassword, password, username }: IRegisterRequest) {
    if (confirmPassword !== password) {
      this.#translateService
        .stream('AUTH.CONFIRM_PASSWORD_MATCH')
        .pipe(take(1))
        .subscribe({
          next: (msg) => {
            throw new Error(msg);
          },
          complete: () => console.log('completed'),
        });
      return;
    }

    return this.#httpService
      .post<ILoginRequest, IViewUser>(AUTH_ENDPOINTS.register, {
        password,
        username,
      })
      .pipe(tap(() => this.#router.navigate(['auth/login'])));
  }

  /**
   * Sets the access token both in the reactive signal and in localStorage.
   * @param token - The new token value or null to clear it.
   */
  setToken(token: string | null): void {
    this.#token.set(token);
  }

  /**
   * Caches the username in the browser's Cache API for later retrieval.
   * @param username - The username to cache.
   * @returns An Observable that completes when the username is successfully cached.
   */
  setUsernameInCache(username: string): Observable<void> {
    return from(caches.open('login-username')).pipe(
      switchMap((cache) => cache.put('username', new Response(username)))
    );
  }

  /**
   * Retrieves the cached username from the browser's Cache API.
   * @returns An Observable emitting the username if found, or an empty Observable otherwise.
   */
  getUsernameFromCache() {
    return from(caches.open('login-username')).pipe(
      switchMap((cache) => from(cache.match('username'))),
      switchMap((username) => (username ? username.text() : EMPTY))
    );
  }

  /**
   * Checks whether the current access token is expired.
   * @returns A boolean indicating whether the token is expired.
   */
  #isTokenExpired() {
    const parsedToken = this.#parseToken();
    if (!parsedToken) return true;

    const msInASecond = 1000;
    const expiryDate = new Date(parsedToken.exp * msInASecond);
    const currentDate = new Date();

    return currentDate > expiryDate;
  }

  /**
   * Parses the access token into its payload using jwtDecode.
   * @returns The token payload of type ITokenPayload or null if no token exists.
   */
  #parseToken(): ITokenPayload | null {
    const token = this.token();

    if (!token) return null;

    return jwtDecode<ITokenPayload>(token);
  }
}
