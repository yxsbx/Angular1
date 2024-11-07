import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export class ApiUtility {
  static handleRequest<T>(
    useLocalApi: boolean,
    localOperation: () => T | undefined,
    apiOperation: () => Observable<T>,
    notFoundMessage: string = 'Item not found'
  ): Observable<T> {
    if (useLocalApi) {
      const result = localOperation();
      return result ? of(result) : throwError(() => new Error(notFoundMessage));
    } else {
      return apiOperation();
    }
  }

  static getAll<T>(http: HttpClient, apiUrl: string): Observable<T[]> {
    return http.get<T[]>(apiUrl);
  }

  static create<T>(http: HttpClient, apiUrl: string, item: T): Observable<T> {
    return http.post<T>(apiUrl, item);
  }

  static getById<T>(
    http: HttpClient,
    apiUrl: string,
    id: number
  ): Observable<T> {
    return http.get<T>(`${apiUrl}/${id}`);
  }

  static update<T>(
    http: HttpClient,
    apiUrl: string,
    id: number,
    item: T
  ): Observable<T> {
    return http.put<T>(`${apiUrl}/${id}`, item);
  }

  static delete(
    http: HttpClient,
    apiUrl: string,
    id: number
  ): Observable<void> {
    return http.delete<void>(`${apiUrl}/${id}`);
  }
}
