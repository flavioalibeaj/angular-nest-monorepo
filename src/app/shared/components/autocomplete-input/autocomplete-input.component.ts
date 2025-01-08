import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { GenericService } from '../../services/generic.service';
import { IFormModel } from '../../model/i-form-model.interface';
import { IOption } from '../../model/i-option.interface';
import { map, Observable, of } from 'rxjs';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

@Component({
  selector: 'autocomplete-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    TranslatePipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ClickStopPropagationDirective,
  ],
  template: `
    @let options = getSelectOptions( inputRef.value) | async; @let errorMessage
    = genericService.handleErrors(control()) | async;

    <mat-form-field [class]="input().inputClass">
      <mat-label>{{ input().label | translate }}</mat-label>
      <input
        #inputRef
        type="text"
        matInput
        [matAutocomplete]="auto"
        [formControl]="control()"
        [readonly]="input().isReadonly"
      />
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
        @for (opt of options; track opt.key) {
        <mat-option [value]="opt">
          <span>{{ opt.value }}</span>
        </mat-option>
        }
      </mat-autocomplete>
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
export class AutocompleteInputComponent {
  protected readonly genericService = inject(GenericService);

  readonly input = input.required<IFormModel>();
  readonly control = input.required<FormControl>();

  displayFn(option?: IOption): string {
    return option?.value ? String(option.value) : '';
  }

  getSelectOptions(inputValue?: string): Observable<IOption[]> {
    if (!this.input().options) return of([]);

    if (this.input().areObservableOptions) {
      const options = this.input().options as Observable<IOption[]>;
      return options.pipe(
        map((options) =>
          options.length ? this.#filterOptions(options, inputValue) : []
        )
      );
    }

    const options = this.input().options as IOption[];
    return of(this.#filterOptions(options, inputValue));
  }

  #filterOptions(options: IOption[], inputValue?: string): IOption[] {
    if (!inputValue?.trim()) return options;

    const lowerCaseValue = inputValue.toLowerCase();
    return options.filter((option) =>
      option.value.toLowerCase().includes(lowerCaseValue)
    );
  }
}
