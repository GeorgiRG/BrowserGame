import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { Sector } from 'src/app/shared/interfaces/sector.interface';
import { MapService } from 'src/app/modules/map/map.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy{

  constructor(
    protected mapSrvc: MapService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  loading: boolean = true;
  error: boolean = false;
  sectors: Sector[] | null = null;

  private destroy$ = new Subject<void>;
  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
        if(data['sectors'] == null){
          this.error = true;
        }
        this.loading = false
        this.sectors = data['sectors'];
      });
  }

  redirect(sectorId: number) {
    this.loading = true;
    this.router.navigate([`map/sector/${sectorId}`]);
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
