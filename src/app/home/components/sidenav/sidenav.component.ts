import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { MatNavList } from '@angular/material/list';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { IMenuElement } from '../../model/i-menu-element.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatNavList,
    SidenavItemComponent,
    MatDivider,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TranslatePipe,
  ],
  template: `
    <mat-sidenav-container class="w-auto h-100">
      <mat-sidenav mode="over" autoFocus="false">
        @let oli = openedListItem(); @if (oli) {
        <div class="d-flex gap-3 align-items-center">
          <button mat-icon-button (click)="openedListItem.set(undefined)">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <p class="fw-bolder m-0">
            {{ oli.name | translate }}
          </p>
        </div>
        <mat-divider />
        }

        <mat-nav-list>
          @for (menuElement of menuItems(); track menuElement; let last = $last)
          {
          <app-sidenav-item
            [menuElement]="menuElement"
            [parentRoute]="parentRoute()"
            (subMenuOpenened)="subMenuOpenened($event)"
          />
          @if(!last){
          <mat-divider />
          } }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav {
        width: 16rem;

        mat-nav-list {
          padding: 0;

          ::ng-deep .mat-mdc-list-item-unscoped-content {
            display: flex;
            gap: 0.5rem;
          }
        }
      }
    `,
  ],
})
export class SidenavComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly sidenavService = inject(SidenavService);
  // TODO show menu items that are permitted

  readonly sidenav = viewChild.required<MatSidenav>(MatSidenav);
  readonly openedListItem = signal<IMenuElement | undefined>(
    this.sidenavService.menuElements
      .filter((e) => !!e.children?.length)
      .find((e) => this.#router.url.includes(e.url))
  );
  readonly parentRoute = computed(() => this.openedListItem()?.url ?? '');
  readonly menuItems = computed(
    () => this.openedListItem()?.children ?? this.sidenavService.menuElements
  );

  readonly #unSub = new Subject<void>();

  ngOnInit(): void {
    this.sidenavService.toggle$
      .pipe(
        tap(() => this.sidenav().toggle()),
        takeUntil(this.#unSub)
      )
      .subscribe();
  }

  subMenuOpenened(menuElement: IMenuElement): void {
    this.openedListItem.set(menuElement);
  }

  ngOnDestroy(): void {
    this.#unSub.next();
    this.#unSub.complete();
  }
}
