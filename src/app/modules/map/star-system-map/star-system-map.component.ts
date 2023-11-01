import { Component, OnDestroy, OnInit } from '@angular/core';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';
import { MapService } from 'src/app/modules/map/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetBasicView } from 'src/app/shared/interfaces/planetBasicView.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-star-system',
  templateUrl: './star-system-map.component.html',
  styleUrls: ['./star-system-map.component.scss']
})
export class StarSystemMapComponent implements OnInit, OnDestroy{

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private mapSrvc: MapService
  ){}

  starSystem : StarSystem | null = null;
  planets: Array<PlanetBasicView> | null = null;
  sectorId: number = 0
  systemId: number = 0;
  private destroy$ = new Subject<void>();
  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.systemId = Number(params.get('systemId'))
      this.sectorId = Number(params.get('sectorId'))
    })
    this.mapSrvc.getStarSystem(this.sectorId, this.systemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(star => {
        if (star != null) {
          this.starSystem = star;
          this.planets = star.planets
        }
      })
  } 

  backToSector(){
    this.router.navigate([`map/sector/${this.sectorId}`]);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
