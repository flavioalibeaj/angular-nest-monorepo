import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  template: `
    <router-outlet />
    <app-spinner />
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly #spinnerService = inject(SpinnerService);

  readonly #unSub = new Subject<void>();

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        ),
        tap((event) => {
          event instanceof NavigationStart
            ? this.#spinnerService.show()
            : this.#spinnerService.hide();
        }),
        takeUntil(this.#unSub)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#unSub.next();
    this.#unSub.complete();
  }
}
