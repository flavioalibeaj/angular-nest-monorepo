import { Component, inject, input } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatError, MatHint } from '@angular/material/form-field';

@Component({
  selector: 'checkbox-input',
  imports: [
    AsyncPipe,
    TranslatePipe,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatHint,
    MatError,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <mat-checkbox [class]="input().inputClass" [formControl]="control()">
      {{ input().label | translate }}</mat-checkbox
    >
    @if (input().hint) {
    <mat-hint>{{ input().hint }}</mat-hint>
    } @if(errorMessage){
    <mat-error>{{ errorMessage }}</mat-error>
    }
  `,
})
export class CheckboxInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
