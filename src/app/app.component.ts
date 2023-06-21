import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './shared/services/user-service.service';
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
		public userService: UserServiceService,
		public cartService: ShoppingBasketService
	) {}

	ngOnInit() {
		this.checkForUserData();
	}

	checkForUserData() {
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			const userData = JSON.parse(authToken);
			this.userService.currentlyLoggedInUser = userData.name;
			this.userService.loggedIn = true;
			this.cartService.cartReference = `user_${userData.id}/cart`;
		} else {
			this.userService.currentlyLoggedInUser = 'Guest';
			this.cartService.cartReference = `user_guest/cart`;
		}

		this.cartService.getUserData();
	}
}
