import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameUIModule } from '../UI-modules/gameUI/gameUI.module';
import { PlanetComponent } from './planet.component';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		GameUIModule,
		IconsModule,
		NgChartsModule
	],
	declarations: [
		PlanetComponent
	]
})
export class PlanetModule { }