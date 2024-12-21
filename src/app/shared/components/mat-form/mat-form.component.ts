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
import { take } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

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

  clearInputValue(fieldName: string): void {
    this.formGroup.get(fieldName)?.setValue(null);
  }

  toggleVisibility(event: MouseEvent) {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;

    console.log(this.formGroup.controls);
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

  #setUpForm() {
    this.formModel().forEach(({ fieldName, fieldValue, validators }) => {
      this.formGroup.addControl(
        fieldName,
        new FormControl(fieldValue, validators)
      );
    });
  }
}
