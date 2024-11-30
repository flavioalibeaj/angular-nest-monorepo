import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, MatProgressSpinnerModule, TranslateModule],
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
  readonly #translateService = inject(TranslateService);
  readonly spinnerService = inject(SpinnerService);

  readonly #unSub = new Subject<void>();

  ngOnInit(): void {
    this.#listenToRouteEvents();
    this.#setUpAppLanguage();
  }

  ngOnDestroy(): void {
    this.#unSub.next();
    this.#unSub.complete();
  }

  #listenToRouteEvents() {
    this.#router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationError
        ),
        tap((event) => {
          if (event instanceof NavigationStart) this.spinnerService.show();
          if (event instanceof NavigationEnd) this.spinnerService.hide();
          if (
            event instanceof NavigationError &&
            event.error instanceof Error &&
            event.error.name === 'ChunkLoadError'
          ) {
            window.location.assign(event.url);
          }
        }),
        takeUntil(this.#unSub)
      )
      .subscribe();
  }

  #setUpAppLanguage() {
    this.#translateService.addLangs(['en', 'al']);

    const lang = localStorage.getItem('language') ?? 'en';
    this.#translateService.setDefaultLang(lang);
    if (!lang) localStorage.setItem('languge', lang);
    this.#translateService.use(lang);
  }
}
