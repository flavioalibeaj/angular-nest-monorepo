import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { EMPTY, filter, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    TranslateModule,
    NgxSpinnerComponent,
  ],
  template: `
    <router-outlet />
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="medium"
      color="#fff"
      type="ball-triangle-path"
      [fullScreen]="true"
      ><p style="color: white">Loading...</p></ngx-spinner
    >
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly #translateService = inject(TranslateService);
  readonly #spinnerService = inject(NgxSpinnerService);

  readonly #unSub = new Subject<void>();
  // // Listen on document visibility
  // @HostListener('document:visibilitychange', ['$event'])
  // appVisibility() {
  //   console.log(document.hidden);
  // }

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
          if (event instanceof NavigationStart) this.#spinnerService.show();

          // TODO handle navigation errors
          if (event instanceof NavigationError) {
            if (
              event.error instanceof Error &&
              event.error.name === 'ChunkLoadError'
            ) {
              console.warn('Error loading module');
              window.location.reload();
              // window.location.assign(event.url);
            }
            throw new Error(event.error);
          }
        }),
        switchMap((event) => {
          return event instanceof NavigationEnd
            ? timer(600).pipe(tap(() => this.#spinnerService.hide()))
            : EMPTY;
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
