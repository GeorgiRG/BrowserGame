import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';
import { ProductionService } from './shared/services/production.service';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BrowserGame';
  constructor(
    protected UserSrvc: UserService,
    protected productionSrvc: ProductionService,
    protected modalService: ModalService
  ){}

  
}
