import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';

@Component({
	selector: 'tooltip',
	template: `	<div class="tooltip" >
								<p>{{name}}</p>
								<p>{{field1}}</p>
								<p>{{field2}}</p>
								<p>{{field3}}</p>
								<p>{{field4}}</p>
								<p>{{field5}}</p>
								<p>{{field6}}</p>
							</div>
						`,
	styleUrls: ['./tooltip.scss'] //animation doesn't work if in here
})
export class TooltipComponent {
	name: string = '';
	field1: string | null = null;
	field2: string | null = null;
	field3: string | null = null;
	field4: string | null = null;
	field5: string | null = null;
	field6: string | null = null;

	@Input() starSystem: StarSystem | null = null;
	//options for additional tooltips

	ngOnInit(){
		if(this.starSystem != null) {
			this.name = this.starSystem.name
			this.field1 = "Claimed by: " + this.starSystem.faction
			this.field2 = "Number of planets: " + this.starSystem.size
			this.field3 = "Total resources: " + this.starSystem.totalResources
		}
	}
}
