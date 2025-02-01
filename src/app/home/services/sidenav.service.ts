import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMenuElement } from '../model/i-menu-element.interface';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  readonly #toggleSubject = new Subject<void>();

  get toggle$(): Observable<void> {
    return this.#toggleSubject.asObservable();
  }

  readonly menuElements: readonly IMenuElement[] = [
    { name: 'PAGES.dashboard', url: 'dashboard', icon: 'dashboard' },
    { name: 'PAGES.settings', url: 'settings', icon: 'gear' },
  ];

  toggleSidenav(): void {
    this.#toggleSubject.next();
  }
}
