import { Injectable } from '@angular/core';
import { ProductionValues } from '../interfaces/production-values.interface';
import { UserService } from 'src/app/core/services/user.service';
import { Planet } from '../interfaces/planet.interface';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({ providedIn: 'root' })
export class PlanetService {

	planetValues : Planet = null!;
	constructor(
		private userSrvc: UserService,
		private http: HttpClient,
		private msgSrvc: ModalService

	) {

	}

	collectPlanetValues(){
		this.http.get<Planet>(`https://localhost:7017/planet/`).pipe(
			catchError((error: any) => {
				return of(null);
			})
		)
			.subscribe((prodValues) => {
				if (prodValues) {
					this.planetValues = this.planetValues;
				}
			})
		if (this.planetValues == null) {
			this.msgSrvc.showMsg("Production values could not be retrieved! Please refresh page!");
		}
	}
}


