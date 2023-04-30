import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from './error.message.service';

import { Observable, pipe, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class GlobalErrorHandler implements ErrorHandler {

	constructor(
		private msgSrvc: ErrorMessageService) { }
		
	handleError(error: unknown): void {
		this.msgSrvc.msg = "There was an unexpected error"
		console.warn("Unhandled error", error)
	}

}