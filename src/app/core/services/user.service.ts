import { effect, inject, Injectable, signal } from '@angular/core';
import { IViewUser } from '../model/i-view-user.interface';
import { HttpService } from '../../shared/services/http.service';
import { USER_ENDPOINTS } from '../../shared/endpoints/endpoints';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #httpService = inject(HttpService);

  readonly #user = signal<IViewUser | null>(
    localStorage.getItem('current_user')
      ? JSON.parse(localStorage.getItem('current_user')!)
      : null
  );
  readonly user = this.#user.asReadonly();

  constructor() {
    effect(() => {
      const currentUser = this.#user();

      if (currentUser) {
        localStorage.setItem('current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('current_user');
      }
    });
  }

  setUser(user: IViewUser | null) {
    this.#user.set(user);
  }

  getMe() {
    return this.#httpService
      .getById<string, IViewUser>(USER_ENDPOINTS.get, this.#user()?.id ?? '')
      .pipe(
        tap((res) => this.setUser(res.data ?? null)),
        map((res) => res.data)
      );
  }
}
