import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
	private userData: User = {
		Id: 0,
		Name: '',
		Faction: '',
		Species: '',
		UserSkillsId: -1,
		SessionId: '' 
	};
	constructor(
	) { }

	updateValues(user: User) {
		if (!user) throwError(() => new Error("User not provided in service"));
		this.userData = user
	}

	user(){
		return this.userData;
	}
}