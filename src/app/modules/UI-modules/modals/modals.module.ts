import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModalComponent } from './message-modal.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		MessageModalComponent,
	],
	exports: [
		MessageModalComponent,
	]
})
export class ModalsModule { }