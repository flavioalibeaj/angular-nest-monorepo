import { ValidatorFn } from '@angular/forms';
import { FieldType } from './field-type';

export interface IFormModel {
  fieldName: string;
  fieldType: FieldType;
  fieldValue?: unknown;
  inputClass?: string;
  validators?: ValidatorFn[];
  label?: string;
  readonly?: boolean;
  clearFieldValue?: boolean; // set true for optional fields
}
