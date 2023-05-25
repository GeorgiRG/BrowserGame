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
import { UserSkills } from 'src/app/shared/interfaces/user-skills.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './char-creation.component.html',
  styleUrls: ['./char-creation.component.scss']
})
export class CharCreationComponent {
  constructor(
    private userSrvc: UserService,
    private router: Router,
    private http: HttpClient) {
     
  }
  page: number = 1
  factions: Array<string>  = ["Vega", "Solar", "Azure", "Unaffiliated"];
  selectedFaction: string = '';
  species : Array<string> = ["Aquatics", "Humans", "Insects", "Liths", "Robots", "Parasites"];
  selectedSpecies: string = '';
  availablePower: number = 10; 
  //not putting these in array so there is more clarity
  //a lot more typing but safer?
  spaceWarfare: number = 5;
  landWarfare: number = 5;
  research: number = 5;
  engineering: number = 5;
  economy: number = 5;

  canSubmit: boolean = false;
  checkInput() {
    this.page = 4;
    if (!this.factions.includes(this.selectedFaction) 
      || !this.species.includes(this.selectedSpecies)
      || this.availablePower != 0
      || (this.selectedFaction != "Unaffiliated" && (this.selectedSpecies == "Robots" || this.selectedSpecies == "Parasites"))
      //all stats + available points
      || this.spaceWarfare + this.landWarfare + this.research + this.engineering + this.economy != 35) 
      { 
        this.canSubmit = false;
    }
    else { this.canSubmit = true; }
  }

  decrease(stat: number) {
    switch (stat) {
      case 1 : 
        this.spaceWarfare--;
        break;
      case 2:
        this.landWarfare--;
        break;
      case 3:
        this.research--;
        break;
      case 4:
        this.engineering--;
        break;
      case 5:
        this.economy--;
        break        
    }
    this.availablePower += 1;
  }

  increase(stat: number) {
    switch (stat) {
      case 1:
        this.spaceWarfare++;
        break;
      case 2:
        this.landWarfare++;
        break;
      case 3:
        this.research++;
        break;
      case 4:
        this.engineering++;
        break;
      case 5:
        this.economy++;
        break
    }
    this.availablePower -= 1;
  }
  updateCharacter() {
    this.http.put(`https://localhost:7017/users?faction=${this.selectedFaction}&species=${this.selectedSpecies}`,{}, { observe: 'response' }).pipe(
      catchError((error) => {
        console.log(error.message);
        return of(false);
      })
    ).subscribe(
      (data: any) => {
        if (data && data.status == 200) {
          //this.router.navigate([''])
          console.log('HTTP response', data.body);
          this.userSrvc.updateValues(data.body);
          this.levelUp();
        }
      })
  }

  levelUp(){
    const skills: UserSkills = {
      Level: 0,
      Experience: 0,
      SpaceWarfare: this.spaceWarfare,
      LandWarfare: this.landWarfare,
      Research: this.research,
      Engineering: this.engineering,
      Economy: this.economy,
      Fame: 0
    };
    this.http.put(`https://localhost:7017/users/levelUp`, skills, { observe: 'response' }).pipe(
      catchError((error) => {
        console.log(error.message);
        return of(false);
      })
    ).subscribe(
      (data: any) => {
        if (data && data.status == 200) {
          //this.router.navigate([''])
          console.log('HTTP response', data.body);
        }
      })
  }
}