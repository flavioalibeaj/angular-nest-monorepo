import { ValidatorFn } from '@angular/forms';
import { FieldType } from './field-type';
import { IOption } from './i-option.interface';
import { Observable } from 'rxjs';

export interface IFormModel {
  fieldName: string;
  fieldType: FieldType;
  label: string;
  fieldValue?: unknown;
  inputClass?: string;
  validators?: ValidatorFn[];
  readonly?: boolean;
  clearFieldValue?: boolean; // set true for optional fields
  minDate?: Date;
  maxDate?: Date;
  dateRangeSecondFieldName?: string;
  dateRangeSecondFieldValue?: Date;
  dateRangeSecondFieldValidators?: ValidatorFn[];
  options?: IOption[] | Observable<IOption[]>;
  observableOptions?: boolean; // set to true if the options being passed are a stream
  multiSelect?: boolean;
  radioOptions?: IOption[];
}
