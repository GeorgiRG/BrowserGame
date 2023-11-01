import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MapService } from './map.service';
import { Sector } from 'src/app/shared/interfaces/sector.interface';

export const MapResolver: ResolveFn<Sector[] | null> = () => {
	const mapService = inject(MapService);
	return mapService.getSectors();
};