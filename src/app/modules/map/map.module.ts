import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { SectorMapComponent } from './sector-map/sector-map.component';
import { MapComponent } from './map.component';
import { StarSystemMapComponent } from './star-system-map/star-system-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameUIModule } from '../UI-modules/gameUI/gameUI.module';
import { MapService } from './map.service';

@NgModule({
	imports: [
		CommonModule,
		MapRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		GameUIModule,
	],
	declarations: [
		SectorMapComponent,
		MapComponent,
		StarSystemMapComponent,
	],
	providers: [
		MapService
	]
})
export class MapModule {}