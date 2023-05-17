import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, retry, tap, catchError, of, throwError, timer, filter } from 'rxjs';
import { ErrorMessageService } from '../services/error.message.service';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private msgSrvc: ErrorMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).pipe(
      retry({
        count: 1,
        delay: (this.shouldRetry),
      }),
      catchError((error: HttpErrorResponse) : Observable<any> => {
        this.msgSrvc.checkError(error)
        return of()
      })
    )
  }
  private shouldRetry(error: HttpErrorResponse, delayCount : number) {
    if (error.status === 404 || error.status >= 500) {
      return timer(delayCount * 1000)
    }
    else {
      console.log("400 thrown\n", error)
      return throwError(() => error);
    }
  }
}
