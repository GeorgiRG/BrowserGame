import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { SectorMapComponent } from './sector-map/sector-map.component';
import { StarSystemMapComponent } from './star-system-map/star-system-map.component';

const routes: Routes = [
	{ path: '', component: MapComponent },
	{ path: 'sector/:sectorId', component: SectorMapComponent },
	{ path: 'sector/:sectorId/star-system/:systemId', component: StarSystemMapComponent },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MapRoutingModule { }
