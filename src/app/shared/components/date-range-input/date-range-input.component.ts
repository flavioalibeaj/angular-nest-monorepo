import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';

@Component({
  selector: 'date-range-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TranslatePipe,
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async; @let
    isClearValueShown = !input().isReadonly && input().clearFieldValue &&
    control().value && rangeControl().value;

    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      <mat-date-range-input
        [min]="input().minDate"
        [max]="input().maxDate"
        [rangePicker]="picker"
      >
        <input
          matStartDate
          [formControl]="control()"
          [readonly]="input().isReadonly"
        />
        <input
          matEndDate
          [formControl]="rangeControl()"
          [readonly]="input().isReadonly"
        />
      </mat-date-range-input>
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
        [disabled]="input().isReadonly"
      />
      <mat-date-range-picker #picker />
      @if (input().hint) {
      <mat-hint>{{ input().hint }}</mat-hint>
      } @if (isClearValueShown) {
      <button
        matSuffix
        type="button"
        mat-icon-button
        aria-label="Clear"
        (click)="clearInputValue($event)"
      >
        <mat-icon>close</mat-icon>
      </button>
      } @if(errorMessage){
      <mat-error>{{ errorMessage }}</mat-error>
      }
    </mat-form-field>
  `,
})
export class DateRangeInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly control = input.required<FormControl>();
  readonly rangeControl = input.required<FormControl>();
  readonly input = input.required<IFormModel>();

  clearInputValue(event: Event) {
    this.rangeControl().setValue(null);
    this.genericService.clearInputValue(this.control(), event);
  }
}
