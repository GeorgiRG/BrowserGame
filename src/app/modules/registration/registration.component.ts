import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(
    private msgSrvc : ModalService,
    private location: Location,
    private http: HttpClient,
    private router: Router
  ) { }
  //adding check if username or emails exist
  userExists: boolean = false;
  emailExists: boolean = false;
  //bools for the icons
  userLoading: boolean = false;
  emailLoading: boolean = false;

  ngOnInit() {
    this.registrationForm.controls['name'].valueChanges.pipe(debounceTime(1000))
      .subscribe(username => {
        this.http.get(`https://localhost:7017/users/check?username=${username}`)
          .pipe(catchError(error => { //just to remove loading on error, error handled later
              this.userLoading == false;
              return of(true)
            })
            ) //Response returns boolean
          .subscribe(usernameIsValid=> {
            this.userLoading = false
            if (usernameIsValid) {
              this.userExists = false
            }
            else { 
              this.registrationForm.controls['name'].setErrors({ 'incorrect': true })
              this.userExists = true;
            }
          })
        }
      )
    this.registrationForm.controls['email'].valueChanges.pipe(debounceTime(1000))
      .subscribe(email => {
        this.http.get(`https://localhost:7017/users/check?email=${email}`)
          .pipe(catchError(error => { //...removing loading
            this.emailLoading == false;
            return of(true)
          }))
          .subscribe(emailIsValid => {
            this.emailLoading = false
            if (emailIsValid) {
              this.emailExists = false
            }
            else { 
              this.emailExists = true 
              this.registrationForm.controls['email'].setErrors({ 'incorrect': true })
            }
          })
      }
    ) 
  }

  registrationForm = new FormGroup({
    //regex explanations on the html
    name: new FormControl('', [Validators.required, Validators.pattern(/^[^<>[\]{\}|\\\/^~')(`=@!¤€"'.%# :;,$%?\0-\cZ](?=.{1}[A-Za-z])[A-Za-z_-\d]{1,25}$/)]),
    email: new FormControl('', [Validators.maxLength(255), Validators.required, Validators.pattern(/^[\w-\.]+@([\w -]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}/)]),
  })

  emailCode = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  get regForm() { return this.registrationForm.controls }
  get confirmationCode() { return this.emailCode }

  goBack() {
    this.location.back();
  }

  goToCharacterCreation() {
    this.router.navigate(['character-creation']);
  }
  registerLoading: boolean = false;
  registered: boolean = true;
  registration() {
    this.registerLoading = true;
    this.registrationForm.setErrors({invalid: 'true'})
    this.http.post("https://localhost:7017/users", this.registrationForm.value).pipe(
      catchError((error : Error) => {
        this.msgSrvc.showMsg("There were errors in user creation.\nReason: " + error.message)
        this.registerLoading = false;
        return of(false)
      })
    ).subscribe(
      (data : any)  => {
        if(data !== false) { 
          this.registered = true;
          console.log('HTTP response', data.message, data)
          this.goToCharacterCreation();
        }
      })
  }
  emailConfirmation(){

    this.http.post(`https://localhost:7017/users/confirmEmail?confirmationCode=${this.emailCode.value}`, this.emailCode.value).pipe(
      catchError(() => {
        return of(false)
      })
    ).subscribe(
      (data: any) => {
        if (data) {
          this.goToCharacterCreation();
        }
      })
  }
}