import { Injectable } from '@angular/core';
import { MessageModalComponent } from '../UIcomponents/modals/message-modal/message-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
	private msgBox!: MessageModalComponent
	constructor(
	){}
	
	addMsgModal(modal: MessageModalComponent){
		this.msgBox = modal
	}
	showMsg(msg: string) {		

		this.msgBox.show(msg)
	}

}