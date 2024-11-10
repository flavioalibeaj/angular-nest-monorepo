import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Icon-button with menu icon"
        (click)="sidenavService.toggleSidenav()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
      <span class="example-spacer"></span>
      <button mat-icon-button aria-label="Icon-button with person icon">
        <mat-icon>person</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  readonly sidenavService = inject(SidenavService);
}
