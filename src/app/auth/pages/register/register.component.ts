import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
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

  hidePassword: boolean = true;
  readonly registerForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.min(8),
    ]),
    confirmPassword: new FormControl<string | null>(null, [
      Validators.required,
      Validators.min(8),
    ]),
  });

  register() {
    if (!this.registerForm.valid) return;

    const { confirmPassword, password, username } =
      this.registerForm.getRawValue();

    this.#authService
      .register({
        confirmPassword: confirmPassword!,
        password: password!,
        username: username!,
      })
      ?.subscribe();
  }
}
