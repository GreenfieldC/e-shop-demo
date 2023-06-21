import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingBasketService } from './shared/services/shopping-basket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'shop-demo';
	constructor(
		private router: Router,
		public cartService: ShoppingBasketService
	) {}

	ngOnInit() {
		this.checkForUserData();
	}

	checkForUserData() {
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			const userData = JSON.parse(authToken);
			this.cartService.cartReference = `user_${userData.id}/cart`;
			this.cartService.currentlyLoggedInUser = userData.name;
			this.cartService.getUserData();
		} else {
			this.cartService.currentlyLoggedInUser = 'Guest';
		}
	}
}
