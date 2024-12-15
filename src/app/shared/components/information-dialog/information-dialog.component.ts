import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IInformationDialogData } from '../../model/i-information-dialog-data';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-information-dialog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AsyncPipe,
    MatDialogClose,
    TranslatePipe,
  ],
  template: `
    <mat-card appearance="outlined" class="h-100">
      <!-- TODO add header background-->
      <mat-card-header>
        <div class="d-flex w-100 pb-3 gap-2">
          <mat-icon class="h-100 d-flex align-items-center">
            {{ dialogData.cardTitleIcon }}
          </mat-icon>
          <mat-card-title>
            {{ dialogData.cardTitle | async }}
          </mat-card-title>
        </div>
        <span class="spacer"></span>
        <button mat-icon-button mat-dialog-close class="close-button">
          <mat-icon> close </mat-icon>
        </button>
      </mat-card-header>
      <mat-card-content
        class="my-4 d-flex flex-column justify-content-center align-items-center"
      >
        <p>{{ dialogData.cardText | async }}</p>
      </mat-card-content>
      <mat-divider class="mt-3" />
      <mat-card-actions align="end" class="d-flex gap-2">
        @if (!dialogData.hideSaveButton) {
        <button mat-raised-button color="primary" (click)="save()">
          <mat-icon>{{ dialogData.saveButtonIcon ?? 'check' }}</mat-icon>
          {{
            (dialogData.saveButtonText | async) ?? ('GENERAL.SAVE' | translate)
          }}
        </button>
        }
        <button mat-stroked-button color="warn" mat-dialog-close>
          <mat-icon>{{ dialogData.cancelButtonIcon ?? 'close' }}</mat-icon>
          {{
            (dialogData.cancelButtonText | async) ??
              ('GENERAL.CLOSE' | translate)
          }}
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .close-button {
        margin-top: -0.5rem;
      }
    `,
  ],
})
export class InformationDialogComponent {
  readonly dialogData: IInformationDialogData = inject(MAT_DIALOG_DATA);
  readonly #matDialogRef = inject(MatDialogRef<InformationDialogComponent>);

  save(): void {
    this.#matDialogRef.close({
      submitted: true,
    });
  }
}
