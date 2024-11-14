import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../services/spinner.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  styles: [
    `
      .spinner-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }
    `,
  ],
  template: `
    @if(spinnerService.isLoading$ | async; as isLoading){
    <div class="spinner-container">
      <mat-spinner />
    </div>
    }
  `,
})
export class SpinnerComponent {
  readonly spinnerService = inject(SpinnerService);
}
