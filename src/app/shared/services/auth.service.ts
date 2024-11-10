import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);

  readonly #token = signal<string | null>(localStorage.getItem('access_token'));
  readonly isLoggedIn = computed(() => !!this.#token());

  logout() {
    localStorage.clear();
    this.#token.set(null);
    this.#router.navigate(['auth']);
  }
}
