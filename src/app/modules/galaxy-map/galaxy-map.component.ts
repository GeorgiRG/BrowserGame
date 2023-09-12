import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector } from 'src/app/shared/interfaces/sector.interface';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-galaxy-map',
  templateUrl: './galaxy-map.component.html',
  styleUrls: ['./galaxy-map.component.scss']
})
export class GalaxyMapComponent {

  constructor(
    public activatedRoute: ActivatedRoute,
    public mapSrvc: MapService,
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
