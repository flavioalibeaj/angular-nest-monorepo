import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/i-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #httpClient = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  post<BT = unknown, RT = unknown>(
    url: string,
    body: BT
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.post<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}`,
      body
    );
  }

  get<RT = unknown>(
    url: string,
    params?: HttpParams
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.get<IApiResponse<RT>>(`${this.#apiUrl}/${url}`, {
      params,
    });
  }

  getById<T = unknown, RT = unknown>(
    url: string,
    id: T,
    params?: HttpParams
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.get<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}/${id}`,
      { params }
    );
  }

  put<BT, RT = unknown>(url: string, body: BT): Observable<IApiResponse<RT>> {
    return this.#httpClient.put<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}`,
      body
    );
  }

  delete<T, RT = unknown>(url: string, id: T): Observable<IApiResponse<RT>> {
    return this.#httpClient.delete<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}/${id}`
    );
  }
}
