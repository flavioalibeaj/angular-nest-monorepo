import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  readonly #isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.#isLoading
    .asObservable()
    .pipe(
      switchMap((isLoading) =>
        isLoading ? of(isLoading) : timer(300).pipe(map(() => false))
      )
    );

  show() {
    this.#isLoading.next(true);
  }

  hide() {
    this.#isLoading.next(false);
  }
}
