import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { SectorMapComponent } from './sector-map/sector-map.component';
import { StarSystemMapComponent } from './star-system-map/star-system-map.component';
import { StarSystemResolver } from './star-system-map/star-system-map.resolver';
import { SectorMapResolver } from './sector-map/sector-map.resolver';

const routes: Routes = [
	{ path: '', component: MapComponent },
	{ 
		path: 'sector/:sectorId', 
		component: SectorMapComponent,
		resolve: {sector: SectorMapResolver} 
	},
	{ 
		path: 'sector/:sectorId/star-system/:systemId', 
		component: StarSystemMapComponent,
		resolve: {starSystem: StarSystemResolver} 
	},	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MapRoutingModule { }
