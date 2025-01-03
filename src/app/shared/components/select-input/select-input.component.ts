import { Component } from '@angular/core';

@Component({
  selector: 'select-input',
  imports: [],
  template: `
    <!-- @let options = (getSelectOptions(input) | async) ?? [];

    <div [class]="input().containerClass">

  <mat-form-field [class]="input.inputClass">
    <mat-label>{{input.label | translate}}</mat-label>
    <mat-select [formControlName]="input.fieldName" [multiple]="input.isMultiSelect">
      @if (input.isMultiSelect) {
      <mat-option #allSelected (onSelectionChange)="onSelectAllToggle(input.fieldName, allSelected.selected, options)">
        {{"GENERAL.SELECT_ALL" | translate}}</mat-option>
      @for (option of options; track option) {
      <mat-option [value]="option.key" [disabled]="input.isReadonly"
        (onSelectionChange)="onSelectionChange(allSelected.selected)">{{option.value}}</mat-option>
      }
      } @else {
      @for (option of options; track option) {
      <mat-option [value]="option.key" [disabled]="input.isReadonly">{{option.value}}</mat-option>
      }
      }
    </mat-select>
    @if (input.clearFieldValue && (input.isMultiSelect ? formGroup().get(input.fieldName)?.value?.length :
    formGroup().get(input.fieldName)?.value)) {
    <button matSuffix type="button" mat-icon-button aria-label="Clear" (click)="clearInputValue(input, $event)">
      <mat-icon>close</mat-icon>
    </button>
    }
  </mat-form-field>
  </div
  -->
  `,
})
export class SelectInputComponent {
  // TODO
  // onSelectAllToggle(
  //   fieldName: string,
  //   allSelected: boolean,
  //   options: IOption[]
  // ) {
  //   console.log(options);
  //   // this.formGroup
  //   //   .get(fieldName)
  //   //   ?.setValue(allSelected ? [...options.map((o) => o.key)] : []);
  // }
  // // TODO
  // onSelectionChange(x: any) {
  //   console.log(x);
  // }
}
