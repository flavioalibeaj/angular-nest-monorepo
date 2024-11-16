import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService } from './core/error-handler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-pulse' })),
    provideAnimationsAsync(),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: '4000',
        panelClass: 'snackbar-error',
      },
    },
    // {
    //   provide: MAT_DIALOG_DEFAULT_OPTIONS,
    //   useValue: {
    //     autoFocus: false,
    //     disableClose: true,
    //     enterAnimationDuration: 200,
    //     exitAnimationDuration: 200,
    //   },
    // }
  ],
};
