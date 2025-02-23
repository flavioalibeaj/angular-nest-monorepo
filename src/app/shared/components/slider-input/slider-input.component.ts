import { Component, input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { MatError, MatHint } from '@angular/material/form-field';
import { HandleFieldErrorPipe } from '../../pipes/handle-field-error.pipe';

@Component({
  selector: 'slider-input',
  imports: [
    MatSliderModule,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    MatHint,
    MatError,
    HandleFieldErrorPipe,
  ],
  template: `
    @let errorMessage = control() | handleFieldError | async;

    <label [id]="'slider-label' + input().label">{{
      input().label | translate
    }}</label>
    <mat-slider
      [class]="input().inputClass"
      [attr.aria-labelledby]="'slider-label' + input().label"
      discrete
      [max]="input().maxValue ?? 100"
      [min]="input().minValue ?? 0"
      [step]="input().stepValue ?? 1"
      [disabled]="input().isReadonly"
    >
      @if(input().rangeSliderFieldName){
      <input [formControl]="control()" matSliderStartThumb />
      <input [formControl]="rangeControl()!" matSliderEndThumb />
      } @else {
      <input matSliderThumb [formControl]="control()" />
      }
    </mat-slider>
    @if (input().hint) {
    <mat-hint>{{ input().hint }}</mat-hint>
    } @if(errorMessage){
    <mat-error>{{ errorMessage }}</mat-error>
    }
  `,
})
export class SliderInputComponent {
  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
  readonly rangeControl = input<FormControl>();
}
