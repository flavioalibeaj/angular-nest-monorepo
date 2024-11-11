import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #httpClient = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  post<BT = any, RT = any>(url: string, body: BT): Observable<RT> {
    return this.#httpClient.post<RT>(`${this.#apiUrl}/${url}`, body);
  }
}
