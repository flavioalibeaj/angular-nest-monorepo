import { Pipe, PipeTransform } from '@angular/core';
import { IFormModel } from '../model/i-form-model.interface';
import { IOption } from '../model/i-option.interface';
import { map, Observable, of } from 'rxjs';

@Pipe({
  name: 'inputOptions',
})
export class InputOptionsPipe implements PipeTransform {
  transform(input: IFormModel, value?: string): Observable<IOption[]> {
    if (!input.options) return of([]);

    if (input.areObservableOptions) {
      const options = input.options as Observable<IOption[]>;
      return options.pipe(
        map((options) =>
          options.length ? this.#filterOptions(options, value) : []
        )
      );
    }

    const options = input.options as IOption[];
    return of(this.#filterOptions(options, value));
  }

  #filterOptions(options: IOption[], inputValue?: string): IOption[] {
    if (!inputValue?.trim()) return options;

    const lowerCaseValue = inputValue.toLowerCase();
    return options.filter((option) =>
      option.value.toLowerCase().includes(lowerCaseValue)
    );
  }
}
