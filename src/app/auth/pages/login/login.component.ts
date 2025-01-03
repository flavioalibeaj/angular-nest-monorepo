import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { switchMap, take } from 'rxjs';
import { IFormModel } from '../../../shared/model/i-form-model.interface';
import { MatFormComponent } from '../../../shared/components/mat-form/mat-form.component';
import { IFormResponse } from '../../../shared/model/i-form-response.interface';
import { FieldType } from '../../../shared/model/field-type.enum';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    TranslatePipe,
    MatFormComponent,
  ],
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {
  readonly #authService = inject(AuthService);
  readonly matFormComponent = viewChild.required(MatFormComponent);

  readonly formModel: IFormModel[] = [
    {
      fieldType: FieldType.TEXT,
      fieldName: 'username',
      label: 'AUTH.USERNAME',
      inputClass: 'w-100',
      validators: [Validators.required],
    },
    {
      fieldType: FieldType.PASSWORD,
      fieldName: 'password',
      label: 'AUTH.PASSWORD',
      inputClass: 'w-100',
      validators: [Validators.required, Validators.minLength(8)],
    },
  ];

  ngOnInit(): void {
    this.#authService
      .getUsernameFromCache()
      .pipe(take(1))
      .subscribe((username) => {
        this.matFormComponent()
          .formGroup()
          .get(this.formModel[0].fieldName)
          ?.setValue(username);
      });
  }

  login({ formData }: IFormResponse<{ password: string; username: string }>) {
    if (!formData) return;
    const { password, username } = formData;

    this.#authService
      .login({ password: password, username: username })
      .pipe(switchMap(() => this.#authService.setUsernameInCache(username)))
      .subscribe();
  }
}
