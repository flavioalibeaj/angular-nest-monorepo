import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  readonly #snackbar = inject(MatSnackBar);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);

  handleError(error: Error): void {
    const message = error.message || 'Unknown error';
    console.log({
      message: message,
      route: this.#router.url,
      time: new Date().toISOString(),
    });

    this.#translate
      .stream('GENERAL.CLOSE')
      .pipe(take(1))
      .subscribe((close) => {
        this.#snackbar.open(message, close);
      });
  }
}
