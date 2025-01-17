import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreloadingService implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return this.#hasBadConnection() ? of(null) : fn();
  }

  #hasBadConnection(): boolean {
    const effectiveType: string =
      (navigator as any).connection?.effectiveType ?? '';

    if (!effectiveType) return true;

    const slowConnections: string[] = ['slow-2g', '2g', '3g'];

    return slowConnections.includes(effectiveType);
  }
}
