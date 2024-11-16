import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MatProgressSpinnerModule],
  styles: [
    `
      .spinner-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }
    `,
  ],
  template: `
    <router-outlet />
    @if(spinnerService.isLoading$ | async; as isLoading){
    <div class="spinner-container">
      <mat-spinner />
    </div>
    }
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly spinnerService = inject(SpinnerService);

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
            ? this.spinnerService.show()
            : this.spinnerService.hide();
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
