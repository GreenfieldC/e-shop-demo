import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserServiceService {
	currentlyLoggedIn: string;

	constructor() {}
}
