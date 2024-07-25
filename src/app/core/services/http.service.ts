import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, { ...options, observe: 'response' }).pipe(
      filter((event: HttpEvent<T>): event is HttpResponse<T> => event instanceof HttpResponse),
      map((response: HttpResponse<T>) => response.body as T),
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(url, body, { ...options, observe: 'response' }).pipe(
      filter((event: HttpEvent<T>): event is HttpResponse<T> => event instanceof HttpResponse),
      map((response: HttpResponse<T>) => response.body as T),
      catchError(this.handleError)
    );
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(url, body, { ...options, observe: 'response' }).pipe(
      filter((event: HttpEvent<T>): event is HttpResponse<T> => event instanceof HttpResponse),
      map((response: HttpResponse<T>) => response.body as T),
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(url, { ...options, observe: 'response' }).pipe(
      filter((event: HttpEvent<T>): event is HttpResponse<T> => event instanceof HttpResponse),
      map((response: HttpResponse<T>) => response.body as T),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Lógica de tratamento de erro
    return throwError(error);
  }
}