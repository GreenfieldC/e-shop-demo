import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingBasketService } from './shared/services/shopping-basket.service';
import { OrderHistoryService } from './shared/services/order-history.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'shop-demo';
	constructor(
		private router: Router,
		public cartService: ShoppingBasketService,
		public orderService: OrderHistoryService
	) {}

	ngOnInit() {
		this.checkForUserData();
	}

	checkForUserData() {
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			const userData = JSON.parse(authToken);

			this.getCart(userData);

			this.getOrders(userData);

			this.getAdresses(userData);
		} else {
			this.cartService.currentlyLoggedInUser = 'Guest';
		}
	}

	getCart(userData: any) {
		this.cartService.cartReference = `user_${userData.id}/cart`;
		this.cartService.currentlyLoggedInUser = userData.name;
		this.cartService.getUserData();
	}

	getOrders(userData: any) {
		this.orderService.orderReference = `user_${userData.id}/orders`;
		this.orderService.currentlyLoggedInUser = userData.name;
		this.orderService.getOrders();
	}

	getAdresses(userData: any) {}
}
