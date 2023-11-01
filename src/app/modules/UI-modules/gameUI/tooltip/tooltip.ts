import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { PlanetBasicView } from 'src/app/shared/interfaces/planetBasicView.interface';
import { Sector } from 'src/app/shared/interfaces/sector.interface';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';

@Component({
	selector: 'tooltip',
	template: `	<div class="tooltip" id="tooltip{{position}}">
								<p style="text-align: center;">{{name}}</p>
								<p> {{field1}}</p>
								<p> {{field2}}</p>
								<p> {{field3}}</p>
								<canvas class="canvasTooltip" id="canvas{{position}}"></canvas>
							</div>
						`,
	styleUrls: ['./tooltip.scss'] //animation doesn't work if in here
})
export class TooltipComponent implements OnInit, AfterViewInit {
	name: string | null = null;
	field1: string | null = null;
	field2: string | null = null;
	field3: string | null = null;
	@Input() position: number | null = null;
	@Input() starSystem: StarSystem | null = null;
	@Input() sector: Sector | null = null;
	@Input() planet: PlanetBasicView | null = null;
	//options for additional tooltips

	ngOnInit(): void {
		//star system tooltip
		if (this.starSystem != null) {
			this.name = "System " + this.starSystem.name;
			this.field1 = "Claimed by: " + this.starSystem.faction
			this.field2 = "Number of planets: " + this.starSystem.size
			this.field3 = "Total resources: " + this.starSystem.totalResources
		}
		//sector tooltip
		else if (this.sector != null) {
			this.name = 'Sector ' + this.position;
			this.field1 = "Bot Players: " + this.sector.bots
			this.field2 = "Number of planets: " + this.sector.totalPlanets
			this.field3 = "Players: " + this.sector.players
		}
		//planet tooltip
		else if (this.planet != null) {
			this.name = 'Planet ' + this.position;
			this.field1 = "Size: " + this.planet.size
			this.field2 = "Surface Temperature: " + this.planet.surfaceTemp
			if (this.planet.ownerName) {
				this.field3 = "Owner: " + this.planet.ownerName + "\nFaction: " + this.planet.ownerFaction;
			}
			else {
				this.field3 = "Not settled";
			}
			const tooltip = document.getElementById('tooltip' + this.position);
			let field4 = document.createElement('p');
			let field5 = document.createElement('p');
			let field6 = document.createElement('p');
			let field7 = document.createElement('p');
			field4.textContent = 'Rare Metals: ' + this.planet.rareMetals
			field5.textContent = 'Metals: ' + this.planet.metals
			field6.textContent = 'Fuels: ' + this.planet.fuels
			field7.textContent = 'Organics: ' + this.planet.organics
			tooltip?.appendChild(field4)
				.appendChild(field5)
				.appendChild(field6)
				.appendChild(field7)
		}
	}
	ngAfterViewInit() : void{
		if(this.sector != null) {
			let free = 100 - this.sector.solarControl -  this.sector.vegaControl -
										this.sector.azureControl - this.sector.robotsControl -
										this.sector.pandemoniumControl - this.sector.swarmControl
			new Chart(
				document.getElementById('canvas' + this.position) as HTMLCanvasElement, 
				{
					type: 'pie',
					data: {
						labels: [ 'Neutral','SE Control', 'VL Control', ' AN Control', 
											'NO Control', 'PN Control', 'Swarm Control'
						],
						datasets: [{
							label: 'adfads',
							data: [free, this.sector.solarControl, this.sector.vegaControl,
										this.sector.azureControl, this.sector.robotsControl,
										this.sector.pandemoniumControl, this.sector.swarmControl],
							backgroundColor: ['white', 'red', 'lightgreen', 'cyan', 'lightgrey', 'hotpink', 'darkgreen']
						}]
					}
				}
			)
		}
	}
}