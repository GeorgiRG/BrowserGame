/* show errors to the user through a message*/
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
	checkError(status: number, msg: string) : string {
		if(status == null) { return msg }
		if(status >= 400 && status < 500) {
			status === 404 ? this._msg = "Nothing was found/Wrong link!" :
											this._msg = "Bad input, please check it and try again!"
		}
		else if(status >= 500) {
			this._msg = "Connection to the server can't be established, please try again later!"
		}
		else {
			this._msg = "Unexpected error, please refresh and try again!" 
		}
		return this._msg
	}
}