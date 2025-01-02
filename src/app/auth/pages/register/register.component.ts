import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormComponent } from '../../../shared/components/mat-form/mat-form.component';
import { IFormModel } from '../../../shared/model/i-form-model.interface';
import { IFormResponse } from '../../../shared/model/i-form-response.interface';
import { FieldType } from '../../../shared/model/field-type.enum';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, RouterLink, TranslatePipe, MatFormComponent],
  templateUrl: './register.component.html',
  styles: [
    `
      mat-card {
        width: 350px;
        max-width: 350px;
        justify-content: space-between;
      }
    `,
  ],
})
export class RegisterComponent {
  readonly #authService = inject(AuthService);
  readonly formModel: IFormModel[] = [
    {
      fieldType: FieldType.TEXT,
      fieldName: 'username',
      label: 'AUTH.USERNAME',
      validators: [Validators.required],
      inputClass: 'w-100',
    },
    {
      fieldType: FieldType.PASSWORD,
      fieldName: 'password',
      label: 'AUTH.PASSWORD',
      validators: [Validators.required, Validators.minLength(8)],
      inputClass: 'w-100',
    },
    {
      fieldType: FieldType.PASSWORD,
      fieldName: 'confirmPassword',
      label: 'AUTH.CONFIRM_PASSWORD',
      validators: [Validators.required, Validators.minLength(8)],
      inputClass: 'w-100',
      hidePasswordToggle: true,
    },
  ];

  register({
    formData,
  }: IFormResponse<{
    username: string;
    password: string;
    confirmPassword: string;
  }>) {
    if (!formData) return;
    const { confirmPassword, password, username } = formData;

    this.#authService
      .register({
        confirmPassword,
        password,
        username,
      })
      ?.subscribe();
  }
}
