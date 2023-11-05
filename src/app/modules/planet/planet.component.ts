
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent {
  constructor(
    private userSrvc: UserService,
    private http: HttpClient,
    private router: Router,
  ){}

  planetPage: number = 0;
  planetSlots: Array<number> = [1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  buildingMenu: boolean = false;
  speciesTeam: string = '';

  // Population pie
  public popPieOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public popPieLabels = ['Aquatics', 'Humans', 'Insects', 'Liths'];
  public popPieDatasets = [{
    data: [1000, 500, 100, 50],
    backgroundColor: ['blue', 'beige', 'lightgreen', 'orangered']
  }];

  openMenu(inputId: string, slot: number) {
    let menu = document.getElementById(inputId)
    if (menu != null) {
      menu.style.display = "block";
      console.log(slot);
    }
  }
  
  options: Array<string> = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6']
  check(event: any){
    //type is event but it emits string 
    this.speciesTeam = event;
  }

  train(){
    this.popPieDatasets[0].data[0] = this.popPieDatasets[0].data[0] + 100
    
    let teamTrained = document.createElement('div')
    teamTrained.style.width = "100%";
    teamTrained.textContent = "Training whatever team (Amount dedicated) Time Left - 55:55"
    let trainingTimes = document.getElementById('trainingTimes');
    let poptab = document.getElementById('populationTab');

    trainingTimes!.appendChild(teamTrained);
    poptab!.style.height = "fit-content";
  }
}