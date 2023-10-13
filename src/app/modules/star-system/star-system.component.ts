import { Component } from '@angular/core';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';
import { MapService } from 'src/app/shared/services/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetBasicView } from 'src/app/shared/interfaces/planetBasicView.interface';


@Component({
  selector: 'app-star-system',
  templateUrl: './star-system.component.html',
  styleUrls: ['./star-system.component.scss']
})
export class StarSystemComponent {

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private mapSrvc: MapService){}

  starSystem : StarSystem | null = null;
  planets: Array<PlanetBasicView> | null = null;
  sectorId: number = 0
  systemId: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.systemId = Number(params.get('systemId'))
      this.sectorId = Number(params.get('sectorId'))
    })
    this.mapSrvc.getStarSystem(this.sectorId, this.systemId).subscribe(star => {
      if (star != null) {
        console.log(star)
        this.starSystem = star;
        this.planets = star.planets
      }
    })
  } 
  backToSector(){
    this.router.navigate(['/sector', { id: this.sectorId }]);

  }
}
