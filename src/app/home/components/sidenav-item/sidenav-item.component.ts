import { Component, input, output } from '@angular/core';
import { MatListItem, MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IMenuElement } from '../../model/i-menu-element.interface';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav-item',
  imports: [
    MatListItem,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    TranslatePipe,
  ],
  template: `
    <mat-list-item
      [activated]="rla.isActive"
      [routerLink]="buildRoute()"
      (click)="openSubMenu()"
    >
      <mat-icon>{{ menuElement().icon }}</mat-icon>
      <!-- <a routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"> -->
      <!-- TODO fix active link styles -->
      <a routerLinkActive #rla="routerLinkActive">
        {{ menuElement().name | translate }}
      </a>
      @if (menuElement().children?.length) {
      <mat-icon class="ms-auto me-3">chevron_right</mat-icon>
      }
    </mat-list-item>
  `,
})
export class SidenavItemComponent {
  readonly menuElement = input.required<IMenuElement>();
  readonly parentRoute = input.required<string>();
  readonly subMenuOpenened = output<IMenuElement>();

  openSubMenu() {
    if (!this.menuElement().children?.length) return;

    this.subMenuOpenened.emit(this.menuElement());
  }

  buildRoute(): string | undefined {
    if (this.menuElement().children?.length) return;

    return `${this.parentRoute()}/${this.menuElement().url}`;
  }
}
