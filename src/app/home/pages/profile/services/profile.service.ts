import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { PROFILE_ENDPOINTS } from '../../../../shared/endpoints/endpoints';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly #httpService = inject(HttpService);
  readonly #router = inject(Router);

  createProfile(fg: unknown) {
    return this.#httpService
      .post(PROFILE_ENDPOINTS.createProfile, fg)
      .pipe(tap(() => this.#router.navigate([''])));
  }
}
