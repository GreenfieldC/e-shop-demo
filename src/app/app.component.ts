import { Component } from '@angular/core';
import { ShoppingBasketService } from './shared/services/shopping-basket.service';
import { OrderHistoryService } from './shared/services/order-history.service';
import { AddressesService } from './shared/services/addresses.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'shop-demo';
	constructor(
		public cartService: ShoppingBasketService,
		public orderService: OrderHistoryService,
		public adressService: AddressesService
	) {}

	ngOnInit() {
		this.checkForUserData();
	}

	//check if in local storage there is saved data present
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

	//get shopping cart
	getCart(userData: any) {
		this.cartService.cartReference = `user_${userData.id}/cart`;
		this.cartService.currentlyLoggedInUser = userData.name;
		this.cartService.getUserData();
	}

	//get order history
	getOrders(userData: any) {
		this.orderService.orderReference = `user_${userData.id}/orders`;
		this.orderService.currentlyLoggedInUser = userData.name;
		this.orderService.getOrders();
	}

	//get all adresses
	getAdresses(userData: any) {
		this.adressService.adressReference = `user_${userData.id}/addresses`;
		this.adressService.currentlyLoggedInUser = userData.name;
		this.adressService.getAdresses();
	}
}
