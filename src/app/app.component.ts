import { Component } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { UserService } from './core/services/user.service';
import { ProductionService } from './shared/services/production.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BrowserGame';
  constructor(
    protected modalSrvc : ModalService,
    protected UserSrvc: UserService,
    protected productionSrvc: ProductionService
  ){}
}
