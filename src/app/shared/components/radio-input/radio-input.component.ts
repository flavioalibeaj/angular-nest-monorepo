import { Component, inject, input } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatError, MatHint } from '@angular/material/form-field';

@Component({
  selector: 'radio-input',
  imports: [
    AsyncPipe,
    TranslatePipe,
    MatRadioModule,
    MatHint,
    MatError,
    ReactiveFormsModule,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <div [class]="input().containerClass">
      <label [id]="'radio-group-label' + input().label">{{
        input().label | translate
      }}</label>
      <mat-radio-group
        [attr.aria-labelledby]="'radio-group-label' + input().label"
        [class]="input().inputClass"
        [formControl]="control()"
      >
        @for (opt of input().radioOptions; track opt.key) {
        <mat-radio-button [value]="opt.key" [disabled]="input().isReadonly">{{
          opt.value
        }}</mat-radio-button>
        }
      </mat-radio-group>
      @if (input().hint) {
      <mat-hint>{{ input().hint }}</mat-hint>
      } @if(errorMessage){
      <mat-error>{{ errorMessage }}</mat-error>
      }
    </div>
  `,
})
export class RadioInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly control = input.required<FormControl>();
  readonly input = input.required<IFormModel>();
}
