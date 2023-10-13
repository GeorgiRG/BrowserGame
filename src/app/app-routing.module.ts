import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { CharCreationComponent } from './modules/character-creation/char-creation.component';
import { SectorMapComponent } from './modules/sector-map/sector-map.component';
import { GalaxyMapComponent } from './modules/galaxy-map/galaxy-map.component';
import { StarSystemComponent } from './modules/star-system/star-system.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'character-creation', component: CharCreationComponent},
  {path: 'sector', component: SectorMapComponent},
  {path: 'galaxy-map', component: GalaxyMapComponent},
  {path: 'sector/:sectorId/star-system/:systemId', component: StarSystemComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
