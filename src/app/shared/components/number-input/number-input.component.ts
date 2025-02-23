import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { IFormModel } from '../../model/i-form-model.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';
import { HandleFieldErrorPipe } from '../../pipes/handle-field-error.pipe';

@Component({
  selector: 'number-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ClickStopPropagationDirective,
    HandleFieldErrorPipe,
  ],
  template: `
    @let errorMessage = control() | handleFieldError| async;

    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      <input
        matInput
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
        [formControl]="control()"
        [readonly]="input().isReadonly"
      />
      @if (input().prefixIcon) {
      <mat-icon matPrefix>{{ input().prefixIcon }}</mat-icon>
      } @if (input().suffixIcon) {
      <mat-icon matSuffix>{{ input().suffixIcon }}</mat-icon>
      } @if (input().hint) {
      <mat-hint>{{ input().hint }}</mat-hint>
      } @if (!input().isReadonly && input().clearFieldValue && control().value)
      {
      <button
        matSuffix
        type="button"
        mat-icon-button
        aria-label="Clear"
        click-stop-propagation
        (click)="control().setValue(null)"
      >
        <mat-icon>close</mat-icon>
      </button>
      } @if(errorMessage){
      <mat-error>{{ errorMessage }}</mat-error>
      }
    </mat-form-field>
  `,
})
export class NumberInputComponent {
  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
