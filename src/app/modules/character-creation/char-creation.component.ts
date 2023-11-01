/*
  Character creation
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { LevelUpSkills } from 'src/app/shared/interfaces/levelUpSkills.interface';
import { Species } from 'src/app/shared/interfaces/species.interface';
import { Faction } from 'src/app/shared/interfaces/faction.interface';
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'app-login',
  templateUrl: './char-creation.component.html',
  styleUrls: ['./char-creation.component.scss']
})
export class CharCreationComponent {
  constructor(
    private userSrvc: UserService,
    private router: Router,
    private http: HttpClient,
    private modalService: ModalService) {
     
  }
  page: number = 1
  gameFactions: Array<Faction> = [];
  factionIndex: number = -1;
  gameSpecies : Array<Species> = [];
  filteredSpecies: Array<Species> = [];
  speciesIndex: number = -1;
  availablePower: number = 10; 
  //not putting these in array so there is more clarity
  //a lot more typing but safer?
  spaceWarfare: number = 5;
  landWarfare: number = 5;
  research: number = 5;
  engineering: number = 5;
  economy: number = 5;
  //initial skill levels start at 5

  canSubmit: boolean = false;

  ngOnInit(){
    this.http.get("https://localhost:7017/factions", {observe: 'response'}).pipe(
      catchError(() => { 
        return of(false)
      })
    ).subscribe((data:any) => {
      if(data != false && data.body != null) {
        this.gameFactions = data.body
      }
    })
    this.http.get("https://localhost:7017/species", { observe: 'response' }).pipe(
      catchError(() => {
        return of(false)
      })
    ).subscribe((data: any) => {
      if (data != false && data.body != null) {
        this.gameSpecies = data.body
      }
    })
  }
  //Move to tools
  checkInput() {
    this.page = 4;
    if ( this.availablePower != 0
        //all stats + available points
        || this.spaceWarfare + this.landWarfare + this.research + this.engineering + this.economy != 35) 
      { 
        this.canSubmit = false;
    }
    else { this.canSubmit = true; }
  }

  filterSpecies(){
    this.page = 2;
    if(this.gameFactions[this.factionIndex].name == "Natural Order"){
      this.filteredSpecies = this.gameSpecies.filter(
        (species) => species.name == "Robots");
    }
    else if (this.gameFactions[this.factionIndex].name == "Swarm") {
      this.filteredSpecies = this.gameSpecies.filter(
        (species) => species.name == "Parasites");
    }
    else if (this.gameFactions[this.factionIndex].name == "Pandemonium") {
      this.filteredSpecies = this.gameSpecies;
    }
    else {
      this.filteredSpecies = this.gameSpecies.filter(
        (species) => species.name != "Parasites" && species.name != "Robots");
    }
  }

  adjust(stat: number, amount: number) {
    switch (stat) {
      case 1 : 
        this.spaceWarfare += amount;
        break;
      case 2:
        this.landWarfare += amount;
        break;
      case 3:
        this.research += amount;
        break;
      case 4:
        this.engineering += amount;
        break;
      case 5:
        this.economy += amount;
        break        
    }
    this.availablePower -= amount;
    
  }

  updateCharacter() {
    this.http.put(`https://localhost:7017/users?faction=${this.gameFactions[this.factionIndex].name}&species=${this.filteredSpecies[this.speciesIndex].name}`,
      {}, { observe: 'response' }).pipe(
      catchError(() => {
        return of(false);
      })
    ).subscribe(
      (data: any) => {
        if (data ) {
          this.userSrvc.updateValues(data.body);
          this.levelUp();
        }
      })
  }

  levelUp(){
    const skills: LevelUpSkills = {
      spaceWarfare: this.spaceWarfare,
      landWarfare: this.landWarfare,
      research: this.research,
      engineering: this.engineering,
      economy: this.economy,
    };
    this.http.put(`https://localhost:7017/users/levelUp`, skills).pipe(
      catchError(() => {
        return of(false);
      })
    ).subscribe(
      (data: any) => {
        if (data !== false) {
          this.modalService.showMsg(`Hello, Commander! Please select a location where your colony will be established!`)
          this.router.navigate(['map'])
        }
      })
  }
}