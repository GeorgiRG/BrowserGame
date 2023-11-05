import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { ProductionService } from './shared/services/production.service';
import { ModalService } from './core/services/modal.service';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BrowserGame';
  constructor(
    protected userSrvc: UserService,
    protected productionSrvc: ProductionService,
    protected modalService: ModalService,
    protected http: HttpClient,
    protected router: Router
  ){}

  ngOnInit(): void {
    this.sessionLogin();
  }
  
  sessionLogin() {
    if (this.userSrvc.user().id != 0) {
      this.http.get<User>(`https://localhost:7017/login`)
        .subscribe((user) => {
          if (!user) {
            this.router.navigate(['login'])
          }
          else {
            this.userSrvc.updateValues(user);
            if (Object.values(user).every(userField => !!userField)) {
              console.log('HTTP response', user);
              this.router.navigate(['map']);
            }
            else {
              console.log('there were null values');
              this.router.navigate(['character-creation']);
            }
          }
        })
    }
  }
}
