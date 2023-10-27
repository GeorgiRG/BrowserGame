import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../gameUI/dropdown/dropdown';
import { NavBarComponent } from '../gameUI/nav-bar/nav-bar.component';
import { TooltipComponent } from './tooltip/tooltip';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		DropdownComponent,
		NavBarComponent,
		TooltipComponent
	],
	exports: [
		DropdownComponent,
		NavBarComponent,
		TooltipComponent
	]
})
export class GameUIModule { }