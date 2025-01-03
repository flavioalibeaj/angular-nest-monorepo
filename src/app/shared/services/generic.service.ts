import { inject, Injectable } from '@angular/core';
import { FieldType } from '../model/field-type.enum';
import { Observable, of } from 'rxjs';
import { validationMessages } from '../validators/validation-messages';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  readonly #translateService = inject(TranslateService);

  handleErrors(
    control: FormControl,
    inputType?: FieldType
  ): Observable<string> {
    const message =
      inputType === FieldType.COLOR && control.hasError('pattern')
        ? 'FORM.ERROR.incorrectColorPattern'
        : validationMessages.find((vm) => control.hasError(vm.key))?.value;

    if (!message) return of('');

    return this.#translateService.stream(message, {
      minPasswordLength: control.errors?.['minlength']?.requiredLength,
    });
  }

  clearInputValue(control: FormControl, event: Event): void {
    control.setValue(null);
    event?.stopPropagation();
  }
}
