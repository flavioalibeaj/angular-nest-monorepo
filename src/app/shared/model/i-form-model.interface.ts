import { ValidatorFn } from '@angular/forms';
import { FieldType } from './field-type.enum';
import { IOption } from './i-option.interface';
import { Observable } from 'rxjs';

export interface IFormModel {
  fieldName: string;
  fieldType: FieldType;
  label: string;
  fieldValue?: unknown;
  inputClass?: string;
  validators?: ValidatorFn[];
  isReadonly?: boolean;
  clearFieldValue?: boolean; // set true for optional fields
  minDate?: Date;
  maxDate?: Date;
  dateRangeSecondFieldName?: string;
  dateRangeSecondFieldValue?: Date;
  dateRangeSecondFieldValidators?: ValidatorFn[];
  options?: IOption[] | Observable<IOption[]>;
  areObservableOptions?: boolean; // set to true if the options being passed are a stream
  isMultiSelect?: boolean;
  radioOptions?: IOption[];
  prefixIcon?: string;
  suffixIcon?: string;
  hint?: string;
  maxValue?: number;
  minValue?: number;
  stepValue?: number;
  rangeSliderFieldName?: string;
  rangeSliderFieldValue?: unknown;
}
