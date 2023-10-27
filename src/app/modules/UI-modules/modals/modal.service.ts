import { Injectable } from '@angular/core';
import { MessageModalComponent } from './message-modal.component';
import { ModalsModule } from './modals.module';

@Injectable({ providedIn: ModalsModule })
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