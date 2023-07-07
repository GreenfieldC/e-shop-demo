import { Component } from '@angular/core';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';

@Component({
	selector: 'app-favourites',
	templateUrl: './favourites.component.html',
	styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
	constructor(
		public exchangeRateService: ExchangeRateService,
		public favsService: FavouritesService
	) {}

	orderPlaced: boolean = false;

	addToCart() {}

	/**
	 * Method to either remove a marked product ID from the favourites array or add it
	 * @param product Object containing all the product data
	 */
	toggleSelected(product: any) {
		if (this.favsService.favourites.includes(product.id)) {
			const favIndex = this.favsService.favourites.indexOf(product.id);
			this.favsService.favourites.splice(favIndex, 1);
			this.favsService.favouritesList.splice(favIndex, 1);
		} else {
			this.favsService.favourites.push(product.id);
			this.favsService.favouritesList.push(product);
		}
		this.favsService.updateFavs();
	}

	/**
	 * Method to set the icon based on whether procut is marked as favorite(filled heart) or not (empty heart)
	 * @param product Object containing all the product data
	 * @returns
	 */
	determineIcon(product: any) {
		if (this.favsService.favourites.includes(product.id)) {
			return 'favorite';
		} else {
			return 'favorite_border';
		}
	}
}
