import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from './error.message.service';
import { ModalService } from './modal.service';

@Injectable({ providedIn: 'root' })

export class GlobalErrorHandler implements ErrorHandler {

	constructor(
		private modalService: ModalService) { }
		
	handleError(error: unknown): void {
		this.modalService.showMsg("There was an unexpected error");
		console.warn("Unhandled error", error)
	}

}