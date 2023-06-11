import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { CharCreationComponent } from './modules/character-creation/char-creation.component';
import { GalaxyMapComponent } from './modules/galaxy-map/galaxy-map.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'character-creation', component: CharCreationComponent},
  {path: 'map', component: GalaxyMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
