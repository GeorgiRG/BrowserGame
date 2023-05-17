
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private userSrvc: UserService,
    private http: HttpClient,
    private router: Router,
  ){
    this.sessionLogin();

  }
  sessionLogin() {
    this.http.get<User>(`https://localhost:7017/login`)
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['login'])
        }
        else {
          this.userSrvc.updateValues(user);
          if (Object.values(user).every(userField => !!userField)) {
            console.log('HTTP response', user);
          }
          else {
            console.log('there were null values')
            this.router.navigate(['character-creation'])
          }
        }
    })
  }
}