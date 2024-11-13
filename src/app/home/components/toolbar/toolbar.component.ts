import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../services/sidenav.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
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
        aria-label="Icon-button with menu icon"
        (click)="sidenavService.toggleSidenav()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
      <span class="example-spacer"></span>
      <button
        [matMenuTriggerFor]="actionsMenu"
        mat-icon-button
        aria-label="Icon-button with three vertical dots icon"
      >
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #actionsMenu>
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        Profile
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        Settings
      </button>
      <button mat-menu-item (click)="authService.logout()">
        <mat-icon>logout</mat-icon>
        Log out
      </button>
    </mat-menu>
  `,
})
export class ToolbarComponent {
  readonly sidenavService = inject(SidenavService);
  readonly authService = inject(AuthService);
}
