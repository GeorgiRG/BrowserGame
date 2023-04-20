import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/login/login.component';
import { MainPageComponent } from '../modules/main-page/main-page.component';
import { RegistrationComponentnent } from '../modules/registration/registration.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponentnent},
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
