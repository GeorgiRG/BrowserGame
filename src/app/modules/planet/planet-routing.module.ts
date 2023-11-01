import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetComponent } from './planet.component';


const routes: Routes = [
	{ path: '', component: PlanetComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MapRoutingModule { }
