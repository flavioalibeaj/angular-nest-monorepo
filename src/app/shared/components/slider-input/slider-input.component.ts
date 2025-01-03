import { Component, inject, input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { GenericService } from '../../services/generic.service';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { MatError, MatHint } from '@angular/material/form-field';

@Component({
  selector: 'slider-input',
  imports: [
    MatSliderModule,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    MatHint,
    MatError,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <div [class]="input().containerClass">
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
    </div>
  `,
})
export class SliderInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
  readonly rangeControl = input<FormControl>();
}
