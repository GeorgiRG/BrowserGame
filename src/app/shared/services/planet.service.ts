import { Injectable } from '@angular/core';
import { ProductionValues } from '../interfaces/production-values.interface';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({ providedIn: 'root' })
export class PlanetService {

	constructor(
		private userSrvc: UserService
	) {

	}


}


