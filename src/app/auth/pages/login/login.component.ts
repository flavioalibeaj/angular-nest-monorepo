import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

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
  ],
  templateUrl: './login.component.html',
  styles: [
    `
      mat-card {
        height: 350px;
        width: 350px;
        max-width: 350px;
        justify-content: space-between;
      }
    `,
  ],
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #translateService = inject(TranslateService);

  hidePassword: boolean = true;
  readonly loginForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    if (!this.loginForm.valid) {
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

    const { password, username } = this.loginForm.getRawValue();

    this.#authService
      .login({ password: password!, username: username! })
      .subscribe();
  }
}
