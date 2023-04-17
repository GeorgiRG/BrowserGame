import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { userCredentials } from 'src/shared/classes/userCredentials';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private location: Location,
    private http: HttpClient
  ) {}
  goBack(): void {
    this.location.back();
  }

  model = new userCredentials('234234', 'Dr. IQ', '12311');

  submitted = false;
  onOther() { this.submitted = false }
  onSubmit() {
    console.log(this.model)
    this.http.post<userCredentials>("https://localhost:7017/users", this.model)
    .subscribe((res) => {
      console.log(res, "maybe works?")
    });
   

    this.submitted = true;
  }

  newUser() {
    this.model = new userCredentials('asdf', '', '');
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
