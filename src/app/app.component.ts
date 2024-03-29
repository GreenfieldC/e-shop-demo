import { Component } from '@angular/core';
import { ShoppingBasketService } from './shared/services/shopping-basket.service';
import { OrderHistoryService } from './shared/services/order-history.service';
import { AddressesService } from './shared/services/addresses.service';
import { FavouritesService } from './shared/services/favourites.service';
import { UserDetailsService } from './shared/services/user-details.service';
import { ProductReviewService } from './shared/services/product-review.service';

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
		public adressService: AddressesService,
		public favService: FavouritesService,
		public userDetailsService: UserDetailsService,
		public reviewService: ProductReviewService
	) {}

	ngOnInit() {
		this.checkForUserData();
		this.reviewService.getProductReviews();
	}

	//check if in local storage there is saved data present
	checkForUserData() {
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			const userData = JSON.parse(authToken);

			this.getCart(userData);

			this.getOrders(userData);

			this.getAdresses(userData);

			this.getFavourites(userData);

			this.getUserDetails(userData);
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

	//get all favorite items (both ids and items)
	getFavourites(userData: any) {
		this.favService.favReference = `user_${userData.id}/favourites`;

		this.favService.favListReference = `user_${userData.id}/favouritesList`;

		this.favService.currentlyLoggedInUser = userData.name;

		this.favService.getFavs();
	}

	//get all user account data
	getUserDetails(userData: any) {
		this.userDetailsService.dataReference = `user_${userData.id}/userDetails`;
		this.userDetailsService.getUserData();
	}
}
