import { Component, inject, input } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../model/i-form-model.interface';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatError, MatHint } from '@angular/material/form-field';

@Component({
  selector: 'slide-toggle-input',
  imports: [
    AsyncPipe,
    TranslatePipe,
    MatSlideToggleModule,
    MatHint,
    MatError,
    ReactiveFormsModule,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <mat-slide-toggle [class]="input().inputClass" [formControl]="control()">
      {{ input().label | translate }}
    </mat-slide-toggle>
    @if (input().hint) {
    <mat-hint>{{ input().hint }}</mat-hint>
    } @if(errorMessage){
    <mat-error>{{ errorMessage }}</mat-error>
    }
  `,
})
export class SlideToggleInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly control = input.required<FormControl>();
  readonly input = input.required<IFormModel>();
}
