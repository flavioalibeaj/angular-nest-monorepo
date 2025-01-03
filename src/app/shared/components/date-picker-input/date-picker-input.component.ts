import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';

@Component({
  selector: 'date-picker-input',
  imports: [
    MatFormField,
    AsyncPipe,
    MatInputModule,
    TranslatePipe,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <div [class]="input().containerClass">
      <mat-form-field [class]="input().inputClass">
        <mat-label> {{ input().label | translate }} </mat-label>
        <input
          matInput
          [min]="input().minDate"
          [max]="input().maxDate"
          [matDatepicker]="picker"
          [formControl]="control()"
          [readonly]="input().isReadonly"
        />
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
          [disabled]="input().isReadonly"
        />
        <mat-datepicker #picker />
        @if (input().hint) {
        <mat-hint>{{ input().hint }}</mat-hint>
        } @if (!input().isReadonly && input().clearFieldValue &&
        control().value) {
        <button
          matSuffix
          type="button"
          mat-icon-button
          aria-label="Clear"
          (click)="genericService.clearInputValue(control(), $event)"
        >
          <mat-icon>close</mat-icon>
        </button>
        } @if(errorMessage){
        <mat-error>{{ errorMessage }}</mat-error>
        }
      </mat-form-field>
    </div>
  `,
})
export class DatePickerInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly control = input.required<FormControl>();
  readonly input = input.required<IFormModel>();
}
