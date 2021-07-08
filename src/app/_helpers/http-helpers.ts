import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";

export const ok = (body: any): Observable<HttpResponse<any>> => {
  return of(
    new HttpResponse(
      {
        status: 200,
        body
      }
    )
  )
}

export const notFound = (body: any): Observable<HttpResponse<any>> => {
  return of(
    new HttpResponse({status: 404, body})
  )
}

export const error = (message: string): Observable<never> => {
  return throwError({ error: { message } });
}

export const unauthorized = (): Observable<never> => {
  return throwError({ status: 401, error: { message: 'Unauthorized' } });
}

export const isLoggedIn = (headers: HttpHeaders): boolean => {
  return headers.get('Authorization') === 'Bearer fake-jwt-token';
}

export const idFromUrl = (url: string): number | string => {
  const urlParts = url.split('/');
  const suffix: number = +urlParts[urlParts.length - 1];
  if (!isNaN(suffix)) {
    return suffix;
  }
  return urlParts[urlParts.length - 1];
}
