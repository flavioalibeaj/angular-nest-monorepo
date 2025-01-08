import { Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { IFormModel } from '../../model/i-form-model.interface';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenericService } from '../../services/generic.service';
import { MatInputModule } from '@angular/material/input';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

@Component({
  selector: 'text-area-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ClickStopPropagationDirective,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      <textarea
        matInput
        type="text"
        [formControl]="control()"
        [readonly]="input().isReadonly"
      ></textarea>
      @if (input().hint) {
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
export class TextAreaInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();
}
