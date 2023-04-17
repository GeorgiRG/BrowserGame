import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userCredentials } from 'src/shared/classes/userCredentials';
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
    private http: HttpClient

  ){}

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  registerForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]), 
    Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  show_register = false;
  showRegister() { console.log("works"); this.show_register = true }
  hideRegister() { console.log("also works"); this.show_register = false }
  login() { console.log(this.profileForm.value, this.profileForm.valid); }
  register() {
    console.log("submitting stuff")
    this.http.post<any>("https://localhost:7017/users", this.registerForm.value)
    .subscribe(data => console.log('Response', data));

  }
  public goToRegister(){
    this.router.navigate(['/register'])
  }
  get regForm() {return this.registerForm.controls}
  get logForm() {return this.profileForm.controls}

}
