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
    return next.handle(request).pipe(
      retry({
        count: 1,
        delay: (this.shouldRetry),
      }),
      catchError((error: HttpErrorResponse) : Observable<any> => {
        let message : string = this.msgSrvc.checkError(error.status, error.message)
        return throwError(() => new Error(message))
      })
    )
  }
  private shouldRetry(error: HttpErrorResponse, delayCount : number) {
    if (error.status === 404 || error.status >= 500) {
      return timer(delayCount * 1000)
    }    
    else if(error.status < 400) {
      return throwError(() => new Error("Server down"));

    }
    else {
      console.log("400 thrown")
      //server returns HttpResponse: {error: {message:"", errors:""}}
      return throwError(() => new Error(error.error.errors));
    }
  }
}
