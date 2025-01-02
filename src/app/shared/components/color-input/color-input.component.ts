import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'color-input',
  imports: [
    MatFormField,
    MatInputModule,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    @let errorMessage = genericService.handleErrors(control()) | async;

    <mat-form-field [class]="input().inputClass">
      <mat-label> {{ input().label | translate }} </mat-label>
      <input
        type="text"
        matInput
        readonly
        [formControl]="control()"
        (click)="colorInput.click(); $event.stopImmediatePropagation()"
      />
      @if (!input().isReadonly) {
      <button
        mat-icon-button
        matSuffix
        (click)="colorInput.click(); $event.stopPropagation()"
      >
        <mat-icon>palette</mat-icon>
      </button>
      } @if (input().hint) {
      <mat-hint>{{ input().hint }}</mat-hint>
      } @if(errorMessage){
      <mat-error>{{ errorMessage }}</mat-error>
      }
    </mat-form-field>
    <input
      #colorInput
      style="visibility: hidden; height: 0; width: 0;"
      type="color"
      pattern="^#[0-9A-Fa-f]{6}$"
      [value]="control().value"
      (change)="onColorChange($event)"
    />
  `,
})
export class ColorInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();

  onColorChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.control().setValue(inputValue);
  }
}
