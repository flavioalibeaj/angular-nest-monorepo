import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/i-api-response.interface';

type ParamType = { [key: string]: string | number | boolean };

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #httpClient = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  /**
   * Sends a POST request to the specified URL with the given body.
   * @param url - Relative URL to append to the API base URL.
   * @param body - Request body of type BT (optional generic type).
   * @returns An Observable emitting the API response of type IApiResponse<RT>.
   */
  post<BT = unknown, RT = unknown>(
    url: string,
    body: BT
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.post<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}`,
      body
    );
  }

  /**
   * Sends a GET request to the specified URL with optional query parameters.
   * @param url - Relative URL to append to the API base URL.
   * @param params - Optional query parameters of type ParamType.
   * @returns An Observable emitting the API response of type IApiResponse<RT>.
   */
  get<RT = unknown>(
    url: string,
    params?: ParamType
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.get<IApiResponse<RT>>(`${this.#apiUrl}/${url}`, {
      params: params ? this.#processHttpParams(params) : undefined,
    });
  }

  /**
   * Sends a GET request to retrieve a resource by its ID, with optional query parameters.
   * @param url - Relative URL to append to the API base URL.
   * @param id - Identifier of the resource.
   * @param params - Optional query parameters of type ParamType.
   * @returns An Observable emitting the API response of type IApiResponse<RT>.
   */
  getById<T = unknown, RT = unknown>(
    url: string,
    id: T,
    params?: ParamType
  ): Observable<IApiResponse<RT>> {
    return this.#httpClient.get<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}/${id}`,
      {
        params: params ? this.#processHttpParams(params) : undefined,
      }
    );
  }

  /**
   * Sends a PUT request to update a resource at the specified URL with the given body.
   * @param url - Relative URL to append to the API base URL.
   * @param body - Request body of type BT.
   * @returns An Observable emitting the API response of type IApiResponse<RT>.
   */
  put<BT, RT = unknown>(url: string, body: BT): Observable<IApiResponse<RT>> {
    return this.#httpClient.put<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}`,
      body
    );
  }

  /**
   * Sends a DELETE request to remove a resource identified by its ID at the specified URL.
   * @param url - Relative URL to append to the API base URL.
   * @param id - Identifier of the resource to delete.
   * @returns An Observable emitting the API response of type IApiResponse<RT>.
   */
  delete<T, RT = unknown>(url: string, id: T): Observable<IApiResponse<RT>> {
    return this.#httpClient.delete<IApiResponse<RT>>(
      `${this.#apiUrl}/${url}/${id}`
    );
  }

  /**
   * Converts a key-value object of query parameters into an HttpParams instance.
   * @param params - Key-value object where keys are parameter names and values are their corresponding values.
   * @returns An HttpParams instance with all the query parameters set.
   */
  #processHttpParams(params: ParamType): HttpParams {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null || value !== undefined) {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }
}
