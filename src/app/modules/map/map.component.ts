import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Sector } from 'src/app/shared/interfaces/sector.interface';
import { MapService } from 'src/app/modules/map/map.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor(
    protected mapSrvc: MapService,
    private router: Router,
  ) {}

  sectors: Sector[] | null = null;

  ngOnInit() {
    this.mapSrvc.getSectors().subscribe(sectors => {
      if (sectors != null) {
        this.sectors = sectors;
      }
    });
  }

  redirect(sectorId: number) {
    this.router.navigate(['/sector', { id: sectorId }]);
  }
}
