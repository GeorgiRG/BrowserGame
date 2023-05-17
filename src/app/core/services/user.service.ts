import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
	private user: User = {
		Id: 0,
		Name: '',
		Email: '',
		Faction: '',
		Race: '',
		CharClass: '',
		SessionId: '' 
	};
	constructor(
	) { }

	updateValues(user: User) {
		if (!user) throwError(() => new Error("User not provided in service"));
		this.user = user
	}

	giveValues(){
		return this.user;
	}
}