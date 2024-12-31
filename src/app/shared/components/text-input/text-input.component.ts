import { Component, effect, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IFormModel } from '../../model/i-form-model.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    ReactiveFormsModule,
  ],
  // templateUrl: './text-input.component.html',
  template: `
    <!-- @let errorMessage = handleErrors(input.fieldName) | async; -->

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
      } @if (!input().isReadonly && input().clearFieldValue && control().value)
      {
      <button matSuffix type="button" mat-icon-button aria-label="Clear">
        <!-- (click)="clearInputValue(input, $event)" -->
        <mat-icon>close</mat-icon>
      </button>
      }
      <!-- @if(errorMessage){
    <mat-error>{{errorMessage}}</mat-error>
    } -->
    </mat-form-field>
  `,
})
export class TextInputComponent {
  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
