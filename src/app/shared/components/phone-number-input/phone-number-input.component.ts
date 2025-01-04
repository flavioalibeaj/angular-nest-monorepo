import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { GenericService } from '../../services/generic.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'phone-number-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      @if (mobilePrefix()) {
      <span matTextPrefix> {{ mobilePrefix() }} &nbsp;</span>
      } @else {
      <mat-icon matPrefix>call</mat-icon>
      }
      <input
        type="tel"
        matInput
        [formControl]="control()"
        [readonly]="input().isReadonly"
      />
      @if (input().hint) {
      <mat-hint>{{ input().hint }}</mat-hint>
      } @if (!input().isReadonly && input().clearFieldValue && control().value)
      {
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
  `,
})
export class PhoneNumberInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly control = input.required<FormControl>();
  readonly input = input.required<IFormModel>();
  readonly mobilePrefix = input<string>();
}
