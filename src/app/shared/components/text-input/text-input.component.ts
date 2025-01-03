import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IFormModel } from '../../model/i-form-model.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'text-input',
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

    <div [class]="input().containerClass">
      <mat-form-field [class]="input().inputClass">
        <mat-label> {{ input().label | translate }} </mat-label>
        <input
          matInput
          type="text"
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
export class TextInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
