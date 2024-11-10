import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  readonly #toggleSubject = new Subject<void>();

  get toggle$(): Observable<void> {
    return this.#toggleSubject.asObservable();
  }

  toggleSidenav(): void {
    this.#toggleSubject.next();
  }
}
