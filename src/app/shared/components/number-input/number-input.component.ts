import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <div [class]="input().containerClass">
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
export class NumberInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
