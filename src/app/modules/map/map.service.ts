import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StarSystem } from '../../shared/interfaces/star-system.interface';
import { Sector } from '../../shared/interfaces/sector.interface';

@Injectable({ providedIn: 'any' })
export class MapService {
	starSystems: any = null;
	constructor(
		private http: HttpClient,
	) {	}

	getSectors(){
		return this.http.get<Sector[]>(`https://localhost:7017/map`,
			{ observe: 'response' }).pipe(
				switchMap(resp => {
					return of(resp.body)
				}),
				catchError(() => {
					return of(null);
				}))
	}

	getSectorSystems(id: number){
		return this.http.get<StarSystem[]>(`https://localhost:7017/map/${id}`,
			{ observe: 'response' }).pipe(
				switchMap(resp => {
					return of(resp.body)
				}),
				catchError(() => {
					return of(null);
				}))
	}
	
	getStarSystem(sectorId: number, starId: number){
		 return this.http.get<StarSystem>(`https://localhost:7017/map/${sectorId}/star-system/${starId}`,
		 	{ observe: 'response' }).pipe(
				switchMap(resp => {
					return of(resp.body)
				}),
				catchError(() => {
					return of(null);
				}))
		}
}


