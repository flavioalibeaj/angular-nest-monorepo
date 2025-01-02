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
import { EMPTY, of, switchMap, take, tap } from 'rxjs';
import { IFormModel } from '../../../shared/model/i-form-model.interface';
import { MatFormComponent } from '../../../shared/components/mat-form/mat-form.component';
import { IFormResponse } from '../../../shared/model/i-form-response.interface';
import { FieldType } from '../../../shared/model/field-type.enum';
import { HttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()],
})
export class LoginComponent {
  readonly formModel: IFormModel[] = [
    {
      fieldName: 'thoughts',
      fieldType: FieldType.DATEPICKER,
      label: 'thoughts',
      inputClass: 'w-100',
      clearFieldValue: true,
      // fieldValue: '004080',
      rangeSliderFieldName: 'onMe',
      // validators: [Validators.required],
    },
    // {
    //   fieldType: FieldType.MULTISELECTAUTOCOMPLETE,
    //   inputClass: 'w-100',
    //   label: 'Users',
    //   validators: [Validators.required],
    //   fieldName: 'users',
    //   isMultiSelect: true,
    //   prefixIcon: 'mood',
    //   hint: 'just a hint',
    //   // fieldValue: {
    //   //   key: 13,
    //   //   value: 'john',
    //   // },
    //   clearFieldValue: true,
    //   isReadonly: false,
    //   areObservableOptions: true,
    //   options: of([
    //     {
    //       key: 13,
    //       value: 'john',
    //     },
    //     {
    //       key: 1,
    //       value: 'jason',
    //     },
    //   ]),
    // },
    // // {
    // //   fieldType: 'select',
    // //   fieldName: 'roomTypes',
    // //   label: 'Room types',
    // //   inputClass: 'w-full',
    // //   clearFieldValue: true,
    // //   multiSelect: true,
    // //   fieldValue: [
    // //     {
    // //       key: 13,
    // //       value: 'john',
    // //     },
    // //   ],
    // //   // observableOptions: true,
    // //   // options: of([
    // //   //   {
    // //   //     key: 13,
    // //   //     value: 'john',
    // //   //   },
    // //   //   {
    // //   //     key: 1,
    // //   //     value: 'jason',
    // //   //   },
    // //   // ]),
    // // },
  ];

  login({ formData }: IFormResponse<{ password: string; username: string }>) {
    console.log(formData);
  }
}
