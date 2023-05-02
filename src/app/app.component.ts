import { Component } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BrowserGame';
  constructor(
    protected modalSrvc : ModalService
  ){}
}
