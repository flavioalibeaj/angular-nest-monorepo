import { inject, Injectable } from '@angular/core';
import { IFormModel } from '../../shared/model/i-form-model.interface';
import { FieldType } from '../../shared/model/field-type.enum';
import { BehaviorSubject, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../pages/profile/services/profile.service';

@Injectable()
export class CreateProfileService {
  readonly #profileService = inject(ProfileService);
  readonly #translateService = inject(TranslateService);

  readonly firstNameInput: IFormModel = {
    fieldName: 'firstName',
    fieldType: FieldType.TEXT,
    label: 'PROFILE.FIRST_NAME',
  };

  readonly lastNameInput: IFormModel = {
    fieldName: 'lastName',
    fieldType: FieldType.TEXT,
    label: 'PROFILE.LAST_NAME',
  };

  readonly phoneNumberInput: IFormModel = {
    fieldName: 'phoneNumber',
    fieldType: FieldType.PHONENUMBER,
    label: 'PROFILE.PHONE_NUMBER',
    inputClass: 'w-100',
  };

  readonly textAreaInput: IFormModel = {
    fieldName: 'bio',
    fieldType: FieldType.TEXTAREA,
    label: 'PROFILE.BIOGRAPHY',
    inputClass: 'w-100',
  };

  readonly #getUserSubject = new BehaviorSubject<void>(undefined);
  readonly getUser$ = this.#getUserSubject.asObservable();

  readonly fg = new FormGroup({
    firstName: new FormControl<string | undefined>(
      undefined,
      Validators.required
    ),
    lastName: new FormControl<string | undefined>(
      undefined,
      Validators.required
    ),
    bio: new FormControl<string | undefined>(undefined),
    phoneNumber: new FormControl<string | undefined>(undefined), // TODO validate phone numbers
    // profilePicture: new FormControl<string | undefined>(undefined), // TODO add profile pic
  });

  createProfile() {
    if (!this.fg.valid) {
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

    const { bio, firstName, lastName, phoneNumber } = this.fg.getRawValue();

    this.#profileService
      .createProfile({
        firstName: firstName!,
        lastName: lastName!,
        phoneNumber: phoneNumber ?? undefined,
        bio: bio ?? undefined,
      })
      .subscribe();
  }
}
