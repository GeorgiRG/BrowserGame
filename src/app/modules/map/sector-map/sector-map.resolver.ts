import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { MapService } from '../map.service';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';

export const SectorMapResolver: ResolveFn<StarSystem[] | null> = (route: ActivatedRouteSnapshot) => {
	const mapService = inject(MapService);
	return mapService.getSectorSystems(Number(route.paramMap.get('sectorId')));
};
