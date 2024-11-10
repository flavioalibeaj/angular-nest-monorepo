import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit, OnDestroy {
  readonly #unSub = new Subject<void>();
  readonly #sidenavService = inject(SidenavService);

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
