import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserServiceService {
	loggedIn: boolean = false;
	currentlyLoggedInUser: string | null;

	constructor() {}
}
