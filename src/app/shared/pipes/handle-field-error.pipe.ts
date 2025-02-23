import { inject, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldType } from '../model/field-type.enum';
import { Observable, of } from 'rxjs';
import { validationMessages } from '../validators/validation-messages';

@Pipe({
  name: 'handleFieldError',
})
export class HandleFieldErrorPipe implements PipeTransform {
  readonly #translateService = inject(TranslateService);

  transform(control?: FormControl, inputType?: FieldType): Observable<string> {
    const emptyString$ = of('');

    if (!control) return emptyString$;

    const message =
      inputType === FieldType.COLOR && control.hasError('pattern')
        ? 'FORM.ERROR.incorrectColorPattern'
        : validationMessages.find((vm) => control.hasError(vm.key))?.value;

    if (!message) return emptyString$;

    return this.#translateService.stream(message, {
      minPasswordLength: control.errors?.['minlength']?.requiredLength,
    });
  }
}
