import { Injectable } from '@angular/core';
import { ProductionValues } from '../../shared/interfaces/production-values.interface';
import { UserService } from 'src/app/core/services/user.service';
import { PlanetBasicView } from '../../shared/interfaces/planetBasicView.interface';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';

@Injectable({ providedIn: 'root' })
export class PlanetService {

	planetValues: PlanetBasicView = null!;
	constructor(
		private userSrvc: UserService,
		private http: HttpClient,
		private msgSrvc: ModalService

	) {}

	collectPlanetValues(){
		this.http.get<PlanetBasicView>(`https://localhost:7017/planet/`).pipe(
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


