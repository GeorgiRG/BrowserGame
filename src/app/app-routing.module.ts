import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { CharCreationComponent } from './modules/character-creation/char-creation.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'registration',  component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'character-creation', component: CharCreationComponent},
  {
    path: 'map',
    loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'planet',
    loadChildren: () => import('./modules/planet/planet.module').then(m => m.PlanetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
