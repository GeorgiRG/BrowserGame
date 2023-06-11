
/*
  Shows galaxy map
*/
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StarSystem } from 'src/app/shared/interfaces/star-system.interface';
@Component({
  selector: 'app-login',
  templateUrl: './galaxy-map.component.html',
  styleUrls: ['./galaxy-map.component.scss']
})
export class GalaxyMapComponent {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}
  
  pannerLeft : number = 0;
  pannerTop : number = 0;
  zoomedAtX : number = 0;
  zoomedAtY : number = 0;
  pannerMousePos = {"X": 0, "Y": 0}
  panning: boolean = false;
  zoomAmount = 0;
  mapSize: DOMRect | null = null;
  pannerSize : DOMRect | null = null;
  mouseCenter = {"X": 0, "Y": 0};
  starSystems : Array<number> = Array(100).fill(1, 0);
  ngAfterViewInit(){
    this.updateMapDimensions();
    document.addEventListener("resize", () => { this.updateMapDimensions});
    document.getElementById("systemsPanner")!.addEventListener("wheel", (event) => { this.zoom(event) })

    const stars = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('star-system');
    const images = <HTMLCollectionOf<HTMLImageElement>>document.getElementsByTagName('img');
    for(let i = 0; i < stars.length; i++){
      let margin = `${Math.floor(Math.random() * 100 + 10)}px`;
      let starType =  Math.floor(Math.random() * 4); 

      stars[i].style.margin = margin;
      images[i].src = `/assets/star${starType}.jpg`
      //images[i].src = "/assets/star-system.jpg"

    }
  }
 
  updateMapDimensions(){
    this.mapSize = document.getElementById("map")!.getBoundingClientRect();
    if (this.mapSize === null) {
      throw new Error("Map dimensions were not updated");
    }
    this.mouseCenter.X = (this.mapSize.width - this.mapSize.left) / 2
    this.mouseCenter.Y = (this.mapSize.height - this.mapSize.top) / 2
    if(this.mouseCenter.X === 0 || this.mouseCenter.Y === 0){
      throw new Error("Mouse center pos was not updated");
    }
  }
  getStarSystems() {
    this.http.get<StarSystem>(`https://localhost:7017/starsystems`, {observe: 'response'})
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
      //console.log(this.mapSize)
      //console.log(window.innerHeight, window.innerWidth);
      //as map container dimensions are 80%/80%
      const movementX = (this.pannerMousePos.X - event.pageX) * 0.8 / (this.mapSize.width );
      const movementY = (this.pannerMousePos.Y - event.pageY ) * 0.8 / (this.mapSize.height );
      //console.log(this.pannerSize!.width , this.mapSize.width)
      //console.log(event.pageY, this.pannerSize! , this.mapSize,  "\n\n")
    
      this.pannerLeft += movementX * this.pannerSize!.width / -2
      this.pannerTop += movementY * this.pannerSize!.height / -2
      //console.log(this.pannerLeft, this.pannerTop)
      panner!.style.left =this.pannerLeft + "px";
      panner!.style.top = this.pannerTop + "px";
      this.pannerMousePos.X = event.pageX;
      this.pannerMousePos.Y = event.pageY
      //Math.min( - this.mapSize.width, Math.max(this.mapSize.width- pannerSize!.width), 
      
      /*console.log("works?");
      console.log(this.systemsPanner?.style.height, this.systemsPanner?.style.width)
      console.log(window.innerHeight, window.innerWidth, this.systemsPanner?.clientHeight, this.systemsPanner?.clientWidth);
      console.log("\n", event.pageX, event.pageY);*/
        //this.systemsPanner.style.left = event.pageX * -1 + "px";
        //this.systemsPanner.style.top = event.pageY * -1 + "px";
    }
  }

  zoom(event: WheelEvent) {
    this.panning = false;
    let zoomChanged = false;
    let panner = document.getElementById("systemsPanner");
    this.pannerSize = panner!.getBoundingClientRect();

    if (this.mapSize !== null && panner !== null ) {
      //restrict zooming with the magic numbers
      if (event.deltaY < 0 && this.zoomAmount < 1) {
        zoomChanged = true;
        this.zoomAmount++;
      }
      else if (event.deltaY > 0 && this.zoomAmount > -10){
        zoomChanged = true
        this.zoomAmount--;
      }

      let scale = this.zoomAmount / 20 + 1 //change zoom by 5%;
      if(zoomChanged) {
        if(this.zoomedAtX != event.pageX || this.zoomedAtY != event.pageY) {
          
          panner!.style.transformOrigin = `
                          ${Math.round((event.pageX - this.pannerSize.left) * 100 / this.pannerSize.width)}% 
                          ${Math.round((event.pageY - this.pannerSize.top) * 100 / this.pannerSize.height)}%
                          `
          this.zoomedAtX = event.pageX;
          this.zoomedAtY = event.pageY;
        }
        panner.style.transform = `scale(${scale})`;
      }

    }
  }
}