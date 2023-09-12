
/*
  Shows galaxy map, boundaries removed for now
  to do: add resolver, add other 100regions
*/
import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';
import { MapService } from 'src/app/shared/services/map.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './sector-map.component.html',
  styleUrls: ['./sector-map.component.scss']
})
export class SectorMapComponent {
  activatedRoute: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    public route: ActivatedRoute,
    private mapSrvc: MapService
  ) {}
  
  //width and height are the same so one number
  starSytemSize: number = 300; //in px
  pannerLeft : number = 0;
  pannerTop : number = 0;
  pannerMousePos = {"X": 0, "Y": 0}
  panning: boolean = false;
  zoomSteps: number = 30;
  zoomFactor: number = 0.01;
  minZoom: number = 0.4;
  maxZoom: number = 1.6;
  zoomAmount = 1;
  mapSize: DOMRect | null = null;
  pannerSize : DOMRect | null = null;
  starSystems : StarSystem[] | null = null;
  backgrounds: Array<string> = [];
  images: Array<string> = [];
  colors = {
    "Solar Empire": 'rgba(255, 0, 0, 0.188)',
    "Vega Legion": 'rgb(24, 219, 66, 0.188)',
    "Azure Nebula": 'rgba(30, 255, 0, 0.088)',
    "Pandemonium": 'rgb(218, 0, 109, 0.188)',
    "Swarm": 'rgb(57, 92, 1, 0.088)',
    "Natural Order": 'rgb(0, 153, 145, 0.288)',
    "": 'rgba(0,0,0,0)'
  }

  sectorId: number = 0;
  ngOnInit(){
    this.route.paramMap.subscribe(params => {this.sectorId = Number(params.get('id'))})
    this.updateMapDimensions();
    document.addEventListener("resize", () => { this.updateMapDimensions});

    let panner = document.getElementById("systemsPanner")
    if(panner == null) location.reload();
    panner!.addEventListener("wheel", (event) => {this.zoom(event, 0, this.zoomFactor)})

    this.mapSrvc.getSectorSystems(this.sectorId).subscribe(stars => {
      if(stars!=null){
        
        for (let i = 0; i < stars.length; i++) {
          let faction = stars[i].faction;
          this.backgrounds.push(this.colors[faction as keyof typeof this.colors])
          let starType = Math.floor(Math.random() * 4);
          this.images.push(`/assets/star${starType}.jpg`);
        }
        this.starSystems = stars;
      }
    })
  }

  //max value to be determined later depending on final galaxy size
  destinationForm = new FormGroup({
    destinationX : new FormControl(0, [Validators.max(9), Validators.min(0), Validators.pattern(/[0-9]/)]),
    destinationY: new FormControl(0, [Validators.max(9), Validators.min(0), Validators.pattern(/[0-9]/)])
  })
  get destForm() { return this.destinationForm.controls }

  goToLocation() {
    this.zoomAmount = 1;
    //-0.5starSystemSize to center planet, pull by half map size for center screen
    this.pannerLeft = (-this.destinationForm.value.destinationX! - 0.5)  * this.starSytemSize + this.mapSize!.width / 2
    this.pannerTop = (-this.destinationForm.value.destinationY! - 0.5) * this.starSytemSize + this.mapSize!.height / 2
    let panner = document.getElementById("systemsPanner");
    panner!.style.transform = `translate(${this.pannerLeft}px, ${this.pannerTop}px) scale(${this.zoomAmount})`;

  }

  updateMapDimensions(){
    this.mapSize = document.getElementById("map")!.getBoundingClientRect();
    if (this.mapSize === null) {
      throw new Error("Map dimensions were not updated");
    }
  }

  
  updatePannerMousePos(event: MouseEvent){
    this.pannerMousePos.X = event.pageX;
    this.pannerMousePos.Y = event.pageY;
    this.panning = true;
  }
  
  moveView(event: MouseEvent){
    if (this.mapSize !== null && this.panning) {
      let panner = document.getElementById("systemsPanner");
      this.pannerSize = panner!.getBoundingClientRect();

      //X movement and boundaries
      const movementX = (this.pannerMousePos.X - event.pageX) / (this.mapSize.width);
      this.pannerLeft += movementX * this.pannerSize!.width / -2.5
      //let rightBoundary = this.mapSize.width - this.pannerSize.width 
      //this.pannerLeft = Math.min(0, Math.max(rightBoundary, this.pannerLeft));
      this.pannerMousePos.X = event.pageX;

      //Y movement and boundaries
      const movementY = (this.pannerMousePos.Y - event.pageY)  / (this.mapSize.height);
      this.pannerTop += movementY * this.pannerSize!.height / -2.5
      //let bottomBoundary = this.mapSize.height - this.pannerSize.height
      //this.pannerTop = Math.min(0, Math.max(bottomBoundary, this.pannerTop));
      this.pannerMousePos.Y = event.pageY;

      panner!.style.transform = `translate(${this.pannerLeft}px, ${this.pannerTop}px) scale(${this.zoomAmount}`;      
    }
  }

  zoom(event: WheelEvent, steps: number, zoomFactor: number) {
    let zoomChanged = false;
    let panner = document.getElementById("systemsPanner");
    this.pannerSize = panner!.getBoundingClientRect();
    panner!.style.transform = `translate(${this.pannerLeft}px, ${this.pannerTop}px) scale(${this.zoomAmount})`;

    let mouseX = event.pageX - this.mapSize!.left
    let mouseY = event.pageY - this.mapSize!.top
    let targetX = (mouseX - this.pannerLeft) / this.zoomAmount
    let targetY = (mouseY - this.pannerTop) / this.zoomAmount

    let zoomDirection = Math.min(1, Math.max(-1, event.deltaY))
    if (this.mapSize !== null && panner !== null) {
      if (steps < this.zoomSteps 
          && this.zoomAmount <= this.maxZoom 
          && this.zoomAmount >= this.minZoom
        ){
        zoomChanged = true;
        this.zoomAmount -= zoomFactor * zoomDirection;
        if(this.zoomAmount > this.maxZoom)  {
          this.zoomAmount = this.maxZoom;
          steps = this.zoomSteps;
        }
        else if (this.zoomAmount < this.minZoom){
          steps = this.zoomSteps;
          this.zoomAmount = this.minZoom;
        }
      }
      if (zoomChanged) {
        this.pannerLeft = -targetX * this.zoomAmount + mouseX
        this.pannerTop = -targetY * this.zoomAmount + mouseY
        /*  no map boundaries on zoom as it messes with it
            pannerSize has to be 10% less or more instead

          let rightBoundary = this.mapSize.width - this.pannerSize.width
          let bottomBoundary = this.mapSize.height - this.pannerSize.height
          this.pannerLeft = Math.min(0, Math.max(rightBoundary  , this.pannerLeft));
          this.pannerTop = Math.min(0, Math.max(bottomBoundary  , this.pannerTop));
        */
        panner!.style.transform = `translate(${this.pannerLeft}px, ${this.pannerTop}px) scale(${this.zoomAmount})`;
        window.requestAnimationFrame(() => this.zoom(event, steps + 1, zoomFactor));
      }
    }
  }
}