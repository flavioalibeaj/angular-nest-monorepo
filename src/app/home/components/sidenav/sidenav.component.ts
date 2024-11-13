import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet],
  styles: [
    `
      mat-sidenav {
        width: 16rem;
      }
    `,
  ],
  template: `
    <mat-sidenav-container class="w-auto h-100">
      <mat-sidenav #sidenav mode="over">
        <!-- autoFocus="false" -->
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidenavComponent implements OnInit, OnDestroy {
  readonly #sidenavService = inject(SidenavService);

  readonly #unSub = new Subject<void>();
  readonly sidenav = viewChild.required<MatSidenav>('sidenav');

  ngOnInit(): void {
    this.#sidenavService.toggle$
      .pipe(
        tap(() => this.sidenav().toggle()),
        takeUntil(this.#unSub)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#unSub.next();
    this.#unSub.complete();
  }
}
