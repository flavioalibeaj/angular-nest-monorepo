import { Component, inject, input, OnInit, output } from '@angular/core';
import { IFormModel } from '../../model/i-form-model.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IFormResponse } from '../../model/i-form-response.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, of, take } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { validationMessages } from './validators/validation-messages';

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
  ],
  templateUrl: './mat-form.component.html',
})
export class MatFormComponent<T> implements OnInit {
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
  readonly formGroup = new FormGroup({});
  hidePassword: boolean = true;

  ngOnInit(): void {
    this.#setUpForm();
  }

  clearInputValue(fieldName: string, event?: Event): void {
    this.formGroup.get(fieldName)?.setValue(null);
    event?.stopPropagation();
  }

  toggleVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  handleErrors(inputName: string): Observable<string> {
    const control = this.formGroup.get(inputName);
    if (!control) return of('');

    const error = validationMessages.find((vm) => control.hasError(vm.key));
    return error
      ? this.#translateService.stream(error.value, {
          minPasswordLength: control.errors?.['minlength']?.requiredLength,
        })
      : of('');
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.#translateService
        .stream('FORM.FILL_VALID_VALUES')
        .pipe(take(1))
        .subscribe({
          next: (msg) => {
            throw new Error(msg);
          },
        });
      return;
    }

    this.formSubmit.emit({
      submitted: true,
      formData: this.formGroup.getRawValue() as T,
    });
  }

  #setUpForm(): void {
    this.formModel().forEach(({ fieldName, fieldValue, validators }) => {
      this.formGroup.addControl(
        fieldName,
        new FormControl(fieldValue, validators)
      );
    });
  }
}
