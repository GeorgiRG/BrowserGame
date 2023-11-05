import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../gameUI/dropdown/dropdown';
import { NavBarComponent } from '../gameUI/nav-bar/nav-bar.component';
import { TooltipComponent } from './tooltip/tooltip';
import { NgChartsModule } from 'ng2-charts';
import { ErrorComponent } from './errors/error.component';
import { LoadingComponent } from './loading/loading';

@NgModule({
	imports: [
		CommonModule,
		NgChartsModule,
	],
	declarations: [
		DropdownComponent,
		ErrorComponent,
		NavBarComponent,
		TooltipComponent,
		LoadingComponent
	],
	exports: [
		DropdownComponent,
		ErrorComponent,
		NavBarComponent,
		TooltipComponent,
		LoadingComponent
	]
})
export class GameUIModule { }