import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { IFormModel } from '../../model/i-form-model.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IFormResponse } from '../../model/i-form-response.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, of, take } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { validationMessages } from './validators/validation-messages';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FieldType } from '../../model/field-type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IOption } from '../../model/i-option.interface';

@Component({
  selector: 'app-mat-form',
  imports: [
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    NgTemplateOutlet,
    AsyncPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatAutocompleteModule,
  ],
  templateUrl: './mat-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatFormComponent<T> {
  readonly #translateService = inject(TranslateService);

  readonly formModel = input.required<IFormModel[]>();
  readonly cancelButtonIcon = input<string>('close');
  readonly submitButtonIcon = input<string>('check');
  readonly cancelButtonText = input<string>('GENERAL.CLOSE');
  readonly submitButtonText = input<string>('GENERAL.SAVE');
  readonly formClass = input<string>();
  readonly actionsClass = input<string>('mt-1 w-100 d-flex gap-3');
  readonly submitButtonClass = input<string>();
  readonly hideCancelBtn = input<boolean>();
  readonly hideSubmitBtn = input<boolean>();
  readonly contentProjection = input<boolean>();

  readonly formSubmit = output<IFormResponse<T>>();
  readonly formGroup = computed(() => {
    const fg = new FormGroup({});

    this.formModel().forEach((input) => {
      switch (input.fieldType) {
        case 'dateRange':
          fg.addControl(
            input.fieldName,
            new FormControl(input.fieldValue, input.validators)
          );
          fg.addControl(
            input.dateRangeSecondFieldName ?? '',
            new FormControl(
              input.dateRangeSecondFieldValue,
              input.dateRangeSecondFieldValidators
            )
          );
          break;

        case 'color':
          fg.addControl(
            input.fieldName,
            new FormControl(input.fieldValue ?? this.blackColor, [
              ...(input.validators ?? []),
              Validators.required,
              Validators.pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
            ])
          );
          break;

        case 'checkbox':
        case 'slideToggle':
          fg.addControl(
            input.fieldName,
            new FormControl({
              disabled: input.isReadonly,
              value: input.fieldValue ?? false,
            })
          );
          break;

        case 'slider':
          fg.addControl(
            input.fieldName,
            new FormControl(input.fieldValue, [
              ...(input.validators ?? []),
              Validators.max(input.maxValue ?? 100),
              Validators.min(input.minValue ?? 0),
            ])
          );
          if (input.rangeSliderFieldName) {
            fg.addControl(
              input.rangeSliderFieldName,
              new FormControl(input.rangeSliderFieldValue, [
                ...(input.validators ?? []),
                Validators.max(input.maxValue ?? 100),
                Validators.min(input.minValue ?? 0),
              ])
            );
          }
          break;

        default:
          fg.addControl(
            input.fieldName,
            new FormControl(input.fieldValue, input.validators)
          );
          break;
      }
    });

    return fg;
  });
  hidePassword: boolean = true;
  protected blackColor: string = '#000000';

  clearInputValue(
    { fieldName, fieldType, dateRangeSecondFieldName }: IFormModel,
    event?: Event
  ): void {
    this.formGroup().get(fieldName)?.setValue(null);

    if (fieldType === 'dateRange' && dateRangeSecondFieldName) {
      this.formGroup().get(dateRangeSecondFieldName)?.setValue(null);
    }
    event?.stopPropagation();
  }

  toggleVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  handleErrors(inputName: string, inputType?: FieldType): Observable<string> {
    const control = this.formGroup().get(inputName);
    if (!control) return of('');

    const message =
      inputType === 'color' && control.hasError('pattern')
        ? 'FORM.ERROR.incorrectColorPattern'
        : validationMessages.find((vm) => control.hasError(vm.key))?.value;

    if (!message) return of('');

    return this.#translateService.stream(message, {
      minPasswordLength: control.errors?.['minlength']?.requiredLength,
    });
  }

  onColorChange(event: Event, fieldName: string): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.formGroup().get(fieldName)?.setValue(inputValue);
  }

  onSubmit(): void {
    if (this.formGroup().invalid) {
      this.#translateService
        .stream('FORM.FILL_VALID_VALUES')
        .pipe(take(1))
        .subscribe({
          next: (msg) => {
            throw new Error(msg);
          },
        });
      this.formGroup().markAllAsTouched();
      return;
    }

    this.formSubmit.emit({
      submitted: true,
      formData: this.formGroup().getRawValue() as T,
    });
  }

  // TODO
  // selectedFile: any = null;

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files;
  //   console.log(this.selectedFile);
  // }

  displayFn(option?: IOption): string {
    return option?.value ? String(option.value) : '';
  }

  getSelectOptions(
    formInput: IFormModel,
    inputValue?: string
  ): Observable<IOption[]> {
    if (!formInput.options) return of([]);

    if (formInput.areObservableOptions) {
      const options = formInput.options as Observable<IOption[]>;
      return options.pipe(
        map((options) =>
          options.length ? this.#filterOptions(options, inputValue) : []
        )
      );
    }

    const options = formInput.options as IOption[];
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
