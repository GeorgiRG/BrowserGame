import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { MapService } from '../map.service';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';

export const StarSystemResolver: ResolveFn<StarSystem | null> = (route: ActivatedRouteSnapshot) => {
	const mapService = inject(MapService);
	return mapService.getStarSystem(
		Number(route.paramMap.get('sectorId')),
		Number(route.paramMap.get('systemId'))
		);
};
