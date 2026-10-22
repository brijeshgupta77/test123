import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.info(`HTTP request: ${request.method} ${request.urlWithParams}`);

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.info(
              `HTTP response: ${event.status} ${request.method} ${request.urlWithParams}`
            );
          }
        },
        error: () => {
          console.error(`HTTP error: ${request.method} ${request.urlWithParams}`);
        }
      })
    );
  }
}
