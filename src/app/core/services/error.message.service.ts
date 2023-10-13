/* show errors to the user through a message*/
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ErrorMessageService {
	private _msgs : string[] = [] 
	private _msg: string = "";

	get msg(): string {
		return this._msg;
	}
	set msg(error: string) {
		this._msg = error;
		this._msgs.push(error)
	}
	//give an according error response for the user
	checkError(errorResp : HttpErrorResponse) {
		if (errorResp == null) {
			this._msg = "Unexpected error, please refresh and try again!"
		}
		if (errorResp.status >= 400 && errorResp.status < 500) {
			if(errorResp.status === 404) { this._msg = "Nothing was found/Wrong link!"} 
			else if (errorResp.status === 401) { this._msg = "Session expired!" }
			else {this._msg = errorResp.error}
		}
		else if (errorResp.status >= 500 || errorResp.status == 0) {
			this._msg = "Connection to the server can't be established, please try again later!"
		}
		else {
			this._msg = "Unexpected error, please refresh and try again!" 
		}
		//console.log(this._msg);
	}
}