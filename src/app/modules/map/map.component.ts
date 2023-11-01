import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
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
  ) {}

  sectors: Sector[] | null = null;

  private destroy$ = new Subject<void>;
  ngOnInit() {
    this.mapSrvc.getSectors()
      .pipe(takeUntil(this.destroy$))  
      .subscribe(sectors => {
        if (sectors != null) {
          this.sectors = sectors;
        }
      });
  }

  redirect(sectorId: number) {
    this.router.navigate([`map/sector/${sectorId}`]);
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
