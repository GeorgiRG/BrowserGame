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
  error : boolean = false;
  loading: boolean = true;
  private destroy$ = new Subject<void>();
  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data['starSystem'] == null) {
          this.error = true;
        }
        else {
          this.starSystem = data['starSystem']
          this.planets = this.starSystem!.planets;
        }
        this.loading = false

      });
  } 

  backToSector(){
    this.loading = true;
    this.router.navigate([`map/sector/${this.sectorId}`]);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
