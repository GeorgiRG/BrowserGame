import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: 'message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit{
  msgContent: string = "???????????????????????????????????????"
  constructor(
    private modalService : ModalService
  ){ }
  ngOnInit(): void {
    this.modalService.addMsgModal(this)
  }
  close(){
    let errorMsgDiv = document.getElementById("backgroundDimmer")
    if (errorMsgDiv !== null) { errorMsgDiv.style.display = "none" }
  }

  show(msg: string){
    let errorMsgDiv = document.getElementById("backgroundDimmer")
    this.msgContent = msg
    if (errorMsgDiv !== null) { errorMsgDiv.style.display = "block" }  
  }

}
