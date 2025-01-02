import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormComponent } from '../mat-form/mat-form.component';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { IFormResponse } from '../../model/i-form-response.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-dialog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormComponent,
    TranslatePipe,
    MatDialogClose,
  ],
  template: `
    <mat-card class="h-100">
      <!-- TODO add header background-->
      <mat-card-header>
        <div class="d-flex w-100 pb-3 gap-2">
          <mat-icon class="h-100 d-flex align-items-center">
            {{ dialogData.cardTitleIcon }}
          </mat-icon>
          <mat-card-title>
            {{ dialogData.cardTitle | translate }}
          </mat-card-title>
        </div>
        <span class="spacer"></span>
        <button mat-icon-button mat-dialog-close class="dialog-close-button">
          <mat-icon> close </mat-icon>
        </button>
      </mat-card-header>
      <mat-card-content class="pb-0 mt-3">
        <app-mat-form
          [formModel]="dialogData.formModel"
          [showCancelBtn]="true"
          (formSubmit)="onSubmit($event)"
        />
      </mat-card-content>
    </mat-card>
  `,
})
export class FormDialogComponent {
  readonly dialogData = inject(MAT_DIALOG_DATA);
  readonly #dialogRef = inject(MatDialogRef<FormDialogComponent>);

  onSubmit({ formData }: IFormResponse) {
    this.#dialogRef.close({
      submitted: true,
      formData,
    });
  }
}
