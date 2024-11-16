import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../profile/services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent implements OnInit {
  readonly #userService = inject(UserService);
  readonly #profileService = inject(ProfileService);

  readonly #getUserSubject = new BehaviorSubject<void>(undefined);
  readonly user = this.#getUserSubject
    .asObservable()
    .pipe(switchMap(() => this.#userService.getMe()));

  readonly createProfileFG = new FormGroup({
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
    profilePicture: new FormControl<string | undefined>(undefined),
  });

  ngOnInit(): void {
    this.#getUserSubject.next();
  }

  createProfile() {
    if (!this.createProfileFG.valid)
      throw new Error('Fill form with valid values');

    this.#profileService.createProfile(this.createProfileFG.getRawValue());
  }
}
