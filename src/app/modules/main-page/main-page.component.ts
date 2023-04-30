/*
  Handles registration, logging in and demo
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(
    private router: Router,
    private http: HttpClient) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\w-\.]+@([\w -]+\.)+[\w-]{2,4}/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)])
  });

  showHidePassword(input: HTMLInputElement, btn: HTMLElement) {
    if (input.type === 'password') {
      input.type = 'text'
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>'
    } 
    else {
      input.type = 'password'
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"/></svg>'
    }   
  }
  showDetails (detailsTab: HTMLDivElement, faction: string) {
    const cont = document.getElementById("content")
    if (cont !== null) {
      let imgUrl = "./assets/"+ faction + ".jpg" //hacky solution for now
      cont.style.backgroundImage = `url(${imgUrl})`;
    }
    detailsTab.style.display = "block"
  }
  hideDetails(detailsTab: HTMLDivElement) {
    detailsTab.style.display = "none"
  }
  login() { console.log(this.loginForm.value, this.loginForm.valid); }

  get logForm() { return this.loginForm.controls}

}
