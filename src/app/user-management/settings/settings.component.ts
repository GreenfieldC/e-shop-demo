import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	@Input() selected: string = 'ACCOUNT SETTINGS';

	constructor(public afAuth: AngularFireAuth, private router: Router) {}

	async logout() {
		await this.afAuth.signOut();
		await localStorage.removeItem('authToken');
		this.router.navigate(['']);
	}
}
