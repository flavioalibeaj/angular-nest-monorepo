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
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

@Component({
  selector: 'password-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    TranslatePipe,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ClickStopPropagationDirective,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;
    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      <input
        matInput
        [type]="hidePassword ? 'password' : 'text'"
        [formControl]="control()"
      />
      @if (!input().hidePasswordToggle) {
      <button
        mat-icon-button
        matSuffix
        type="button"
        click-stop-propagation
        (click)="hidePassword = !hidePassword"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="hidePassword"
      >
        <mat-icon>{{
          hidePassword ? 'visibility_off' : 'visibility'
        }}</mat-icon>
      </button>
      } @if (errorMessage) {
      <mat-error>{{ errorMessage }}</mat-error>
      }
    </mat-form-field>
  `,
})
export class PasswordInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();

  protected hidePassword: boolean = true;
}
