import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	@Input() selected: string = 'ACCOUNT SETTINGS';

	constructor(public afAuth: AngularFireAuth) {}

	logout() {
		//! not working yet
		this.afAuth.signOut();
		localStorage.removeItem('authToken');
	}
}
