import { Injectable } from '@angular/core';
import { ProductionValues } from '../interfaces/production-values.interface';
import { UserService } from 'src/app/core/services/user.service';
import { PlanetService } from './planet.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalService } from './modal.service';
import { Resource } from '../interfaces/resource.interface';
@Injectable({ providedIn: 'root' })
export class ProductionService {
	//format is {Planet Name: Production Value}
	productionValues: Array<ProductionValues> = [];
	currentlyViewedProdValue : ProductionValues = null!;
	//resources needed per worker
	private reqiredResources = {
		'RareMetals': {},
		'Metals': {},
		'Organics': {},
		'Fuels': {},
		'Batteries' : {'Metals' : 1, 'Fuels': 2},
		'Explosives': {'Organics': 2},
		'Electronics': {'RareMetals': 1, 'Metals': 2},
		'Armor': {'Metals': 5},
		'Plastics': {'Organics': 3},
		'Food': {'Organics': 4},
		'Guns': {'RareMetals': 1, 'Metals': 2, 'Explosives': 1},
		'ShipParts': {'Electronics': 1, 'Armor': 2, 'ConstructionMaterials': 5},
		'ConstructionMaterials': {'Metals': 3, 'Plastics': 1},
		'ResearchMaterials': {'Plastics': 1, 'RareMetals': 1, 'Electronics': 1}
	};
	constructor(
		private http: HttpClient,
		private msgSrvc: ModalService,
	) {	
	}

	collectProductionValues(productionId: number): ProductionValues{
		this.http.get<ProductionValues>(`https://localhost:7017/productions/${productionId}`).pipe(
			catchError(() => {
				return of(null);
			})
		)
		.subscribe((prodValues) => {
			if(prodValues){
				this.productionValues.push(prodValues);
			}
			return prodValues;
		})
		return null!;
	}

	//if not stored in memory, collect it from backend
	getPlanetProduction(productionId: number): ProductionValues {
		for(let i = 0; i < this.productionValues.length; i++){
			if(this.productionValues[i].ProductionId == productionId){
				this.currentlyViewedProdValue = this.productionValues[i];
				return this.currentlyViewedProdValue;
			}
		}
		this.currentlyViewedProdValue = this.collectProductionValues(productionId);
		return this.currentlyViewedProdValue;
	}

	//
	updateProduction(resource: string, workers: number, factories: number): Object {
		let res: Resource | number = this.currentlyViewedProdValue[resource as keyof ProductionValues];
		if(typeof res != 'number') {
			let prod = this.factoryProduction(workers, factories);
			res.GainPerHour = prod.production;
			res.Efficiency = prod.efficiency;
			res.Factories = factories;
			res.Workers = workers;
		}
		let costs: any = this.reqiredResources[resource as keyof typeof this.reqiredResources]
		for (const key of Object.keys(costs)) {
			costs[key as keyof typeof costs] = costs[key as keyof typeof costs] * workers;;
		}
		return costs;
	}
	factoryProduction(workers: number, factories: number) : {efficiency: number, production: number}  {
		//with this more and more factories on one resource will get increasingly better
		//downside of it is that it will require min 1worker per factory to produce anything
		//and higher cost for more factories, specializing would also require dragging
		//resources across planets, which has a risk of them being lost
		const scalingRatio = Math.round(workers * (workers /( 35 * factories * 1.5)));
		//in percent
		let efficiency = Math.round(Math.log(workers - factories + 1) / Math.log(2)) * 15 - scalingRatio;
		if (efficiency < 0) {
			efficiency = 0;
		}
		return { efficiency: efficiency, production: efficiency * workers / 100 }
	}
}


