import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../services/sidenav.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LowerCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialogComponent } from '../../../shared/components/information-dialog/information-dialog.component';
import { IInformationDialogData } from '../../../shared/model/i-information-dialog-data';
import { filter, tap } from 'rxjs';
import { IDialogResponse } from '../../../shared/model/i-dialog-response';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslatePipe,
    MatTooltipModule,
    LowerCasePipe,
  ],
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        aria-label="Icon-button with menu icon"
        (click)="sidenavService.toggleSidenav()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
      <span class="spacer"></span>
      <button
        mat-icon-button
        [matMenuTriggerFor]="changeLanguageMenu"
        aria-label="Change language icon-button"
        [matTooltip]="'TOOLBAR.CHANGE_LANG' | translate"
      >
        <mat-icon>translate</mat-icon>
      </button>
      <button
        [matMenuTriggerFor]="actionsMenu"
        mat-icon-button
        aria-label="Icon-button with three vertical dots icon"
        [matTooltip]="'TOOLBAR.ACTIONS' | translate"
      >
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #actionsMenu>
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        {{ 'TOOLBAR.PROFILE' | translate }}
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        {{ 'TOOLBAR.SETTINGS' | translate }}
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        {{ 'TOOLBAR.LOG_OUT' | translate }}
      </button>
    </mat-menu>

    <mat-menu #changeLanguageMenu xPosition="before">
      @for (lang of languages; track lang) {
      <button mat-menu-item class="pe-0" (click)="setLanguage(lang.code)">
        <div class="d-flex flex-row align-items-center gap-3">
          <span class="fi fi-{{ lang.img | lowercase }}"></span>
          {{ lang.label | translate }}
          @if (translateService.currentLang == lang.code) {
          <mat-icon color="primary">done</mat-icon>
          }
        </div>
      </button>
      }
    </mat-menu>
  `,
})
export class ToolbarComponent {
  readonly sidenavService = inject(SidenavService);
  readonly translateService = inject(TranslateService);
  readonly #authService = inject(AuthService);
  readonly #matDialog = inject(MatDialog);

  readonly languages = [
    {
      label: 'LANGUAGES.ALBANIAN',
      code: 'al',
      img: 'AL',
    },
    {
      label: 'LANGUAGES.ENGLISH',
      code: 'en',
      img: 'GB',
    },
  ];

  setLanguage(code: string) {
    this.translateService.use(code);
    localStorage.setItem('language', code);
  }

  logout() {
    const dialogData: IInformationDialogData = {
      cardText: this.translateService.stream('AUTH.LOG_OUT_MESSAGE'),
      cardTitle: this.translateService.stream('TOOLBAR.LOG_OUT'),
      cardTitleIcon: 'logout',
      cancelButtonText: this.translateService.stream('GENERAL.CLOSE'),
      saveButtonText: this.translateService.stream('TOOLBAR.LOG_OUT'),
      saveButtonIcon: 'logout',
    };

    this.#matDialog
      .open(InformationDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .pipe(
        filter((res?: IDialogResponse) => !!res?.submitted),
        tap(() => this.#authService.logout())
      )
      .subscribe();
  }
}
