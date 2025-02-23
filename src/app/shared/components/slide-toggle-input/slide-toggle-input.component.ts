import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatError, MatHint } from '@angular/material/form-field';
import { HandleFieldErrorPipe } from '../../pipes/handle-field-error.pipe';

@Component({
  selector: 'slide-toggle-input',
  imports: [
    AsyncPipe,
    TranslatePipe,
    MatSlideToggleModule,
    MatHint,
    MatError,
    ReactiveFormsModule,
    HandleFieldErrorPipe,
  ],
  template: `
    @let errorMessage = control() | handleFieldError| async;

    <mat-slide-toggle [class]="input().inputClass" [formControl]="control()">
      {{ input().label | translate }}
    </mat-slide-toggle>
    @if (input().hint) {
    <mat-hint>{{ input().hint }}</mat-hint>
    } @if(errorMessage){
    <mat-error>{{ errorMessage }}</mat-error>
    }
  `,
})
export class SlideToggleInputComponent {
  readonly control = input.required<FormControl>();
  readonly input = input.required<IFormModel>();
}
