/*
  Handles registration, logging in and demo
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { GeneralResponse } from 'src/app/shared/interfaces/general-response.interface';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(
    private router: Router,
    private http: HttpClient) {
      this.skipLogin();
    }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\w-\.]+@([\w -]+\.)+[\w-]{2,4}/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)])
  });
  get logForm() { return this.loginForm.controls }

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

  skipLogin() {
    this.http.get(`https://localhost:7017/login`, {observe: 'response'}).pipe(
      catchError((error: Error) => {
        console.log(error.message)
        return of(false)
      })
    ).subscribe((data: any) => {
      if (data && data.status == 200) {
        this.router.navigate(['login'])
        console.log('HTTP response', data)
      }
    })
  }

  login() {
    this.loginForm.setErrors({ invalid: 'true' })    
    this.http.post(`https://localhost:7017/login`, this.loginForm.value, { observe: 'response' }).pipe(
      catchError((error: Error) => {
        console.log(error.message)
        return of(false)
      })
    ).subscribe(
      (data: any) => {
        if (data && data.status == 200) {
          this.router.navigate(['login'])
          console.log('HTTP response', data)
        }
      }
    ) 
  }
  /*
  test() {
    console.log("submits?")
    this.http.get(`https://localhost:7017/users?sessionId=${this.asdfa}`).pipe(
      catchError((error: Error) => {
        console.log(error)
        return of([error])
      })
    ).subscribe(
      (data: any) => {

        console.log('HTTP response', data)
        console.log(document.cookie)

      })
  }*/
}
