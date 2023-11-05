
/*
  Handles registration, logging in and demo
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private modalService: ModalService
    ) { }

  ngOnInit(): void {
    this.sessionLogin();
  }

  sessionLogin() {
    if (this.userService.user().id != 0) {
      this.http.get<User>(`https://localhost:7017/login`)
        .subscribe((user) => {
          if (!user) {
            this.modalService.showMsg("Session expired");
          }
          else {
            this.userService.updateValues(user);
            if (Object.values(user).every(userField => !!userField)) {
              console.log('HTTP response', user);
              this.router.navigate(['map']);
            }
            else {
              this.modalService.showMsg("Finish your character creation")
              this.router.navigate(['character-creation'])
            }
          }
        })
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\w-\.]+@([\w -]+\.)+[\w-]{2,4}/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)]),
    rememberMe: new FormControl()
  });
  get logForm() { return this.loginForm.controls }

  showDetails(detailsTab: HTMLDivElement, faction: string) {
    const cont = document.getElementById("content")
    if (cont !== null) {
      let imgUrl = "./assets/" + faction + ".jpg" //hacky solution for now
      cont.style.backgroundImage = `url(${imgUrl})`;
    }
    detailsTab.style.display = "block"
  }

  hideDetails(detailsTab: HTMLDivElement) {
    detailsTab.style.display = "none"
  }

  rememberMe : boolean = false;
  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
  
  login() {
    this.loginForm.setErrors({ invalid: 'true' })
    
    this.http.post<User>(`https://localhost:7017/login?rememberMe=${this.rememberMe}`, this.loginForm.value).pipe(
      catchError((error: Error) => {
        console.log(error.message)
        return of(null)
      })
    ).subscribe(
      (user) => {
        if (user != null) {
          if(user.faction == null || user.species == null) {
            this.router.navigate(['character-creation'])
          }
          else {
            this.router.navigate([''])

          }
          console.log('HTTP response', user)
        }
      }
    )
  }
}