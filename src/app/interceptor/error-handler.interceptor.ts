import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    const GUID = 'f4179b26-21ac-432c-bcd8-cb4bc6e50981'
    const modifiedRequest = request.clone({
      setHeaders:{
        GUID
      }
    })
    return next.handle(modifiedRequest);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('error occurred:', error);
        //throw error as per requirement
        return throwError(()=>error);
      })
    );
  }
}
