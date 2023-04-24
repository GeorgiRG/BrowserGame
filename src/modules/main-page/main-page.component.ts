/*
  Handles registration, logging in and demo
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  
  constructor(
    private router: Router,
    private http: HttpClient) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\w-\.]+@([\w -]+\.)+[\w-]{2,4}/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)])
  });

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z-_']{3,25}")]),
    email: new FormControl('', [Validators.required, Validators.pattern(/[\w-\.]+@([\w -]+\.)+[\w-]{2,4}/)]), 
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)]),
  })

  show_registration : boolean = false;
  showHideRegistration() { this.show_registration = !this.show_registration }
  showHidePassword(input: HTMLInputElement, btn: HTMLElement) {
    if (input.type === 'password') {
      input.type = 'text'
      btn.textContent = 'Hide'
    } 
    else {
      input.type = 'password'
      btn.textContent = 'Show'
    }   
  }
  showDetails (detailsTab: HTMLDivElement, faction: string) {
    const cont = document.getElementById("content")
    if (cont !== null) {
      let imgUrl = faction + ".jpg" //hacky solution for now
      cont.style.backgroundImage = 'url("green.jpg")';
    }
    detailsTab.style.display = "block"
  }
  hideDetails(detailsTab: HTMLDivElement) {
    detailsTab.style.display = "none"
  }
  login() { console.log(this.loginForm.value, this.loginForm.valid); }

  registration() {
    console.log("submitting stuff")
    this.http.post<any>("https://localhost:7017/users", this.registrationForm.value)
    .subscribe(data => console.log('Response', data.errors))

  }
  public goToRegistration(){
    this.router.navigate(['/registration'])
  }
  get regForm() {return this.registrationForm.controls}
  get logForm() { return this.loginForm.controls}

}
