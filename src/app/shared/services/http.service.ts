import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #httpClient = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  post<BT = unknown, RT = unknown>(url: string, body: BT): Observable<RT> {
    return this.#httpClient.post<RT>(`${this.#apiUrl}/${url}`, body);
  }

  get<RT = unknown>(url: string, params?: HttpParams): Observable<RT> {
    return this.#httpClient.get<RT>(`${this.#apiUrl}/${url}`, { params });
  }

  getById<T = unknown, RT = unknown>(
    url: string,
    id: T,
    params?: HttpParams
  ): Observable<RT> {
    return this.#httpClient.get<RT>(`${this.#apiUrl}/${url}/${id}`, { params });
  }

  put<BT, RT = unknown>(url: string, body: BT): Observable<RT> {
    return this.#httpClient.put<RT>(`${this.#apiUrl}/${url}`, body);
  }

  delete<T, RT = unknown>(url: string, id: T): Observable<RT> {
    return this.#httpClient.delete<RT>(`${this.#apiUrl}/${url}/${id}`);
  }
}
