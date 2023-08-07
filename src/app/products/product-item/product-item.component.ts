import { Component, Input, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
	@Input() product: any;
	products: Array<any>;
	selected: boolean = false;

	constructor(
		public apiService: ApiService,
		private dialog: MatDialog,
		public exchangeRateService: ExchangeRateService,
		public favouritesService: FavouritesService
	) {
		/**
		 * Subscription to Porducts Observable
		 */
		this.apiService.getProducts.subscribe((data) => {
			data.forEach((obj: any) => {
				obj.quantity = 1;
				obj.size = '';
			});
			this.products = data;
		});
	}

	/**
	 * Opens prodcuts detail view when clicking on it
	 * @param product Object containing all the product data
	 */
	openDetailView(product: any) {
		const isMobileView = window.innerWidth < 800;
		const dialogConfig = {
			data: product,
			maxHeight: isMobileView ? '100dvh' : '650px',
			maxWidth: isMobileView ? '480px' : '800px',
			height: isMobileView ? '100dvh' : 'fit-content',
			width: '100%',
			panelClass: isMobileView ? 'full-screen-modal' : undefined,
		};

		this.dialog.open(DialogProductDetailsComponent, dialogConfig);
		console.log(product);
	}

	/**
	 * Method to either remove a marked product ID from the favourites array or add it
	 * @param product Object containing all the product data
	 */
	toggleSelected(product: any) {
		if (this.favouritesService.favourites.includes(product.id)) {
			const favIndex = this.favouritesService.favourites.indexOf(product.id);
			this.favouritesService.favourites.splice(favIndex, 1);
			this.favouritesService.favouritesList.splice(favIndex, 1);
		} else {
			this.favouritesService.favourites.push(product.id);
			this.favouritesService.favouritesList.push(product);
		}
		this.favouritesService.updateFavs();
	}

	/**
	 * Method to set the icon based on whether procut is marked as favorite(filled heart) or not (empty heart)
	 * @param product Object containing all the product data
	 * @returns
	 */
	determineIcon(product: any) {
		if (this.favouritesService.favourites.includes(product.id)) {
			return 'favorite';
		} else {
			return 'favorite_border';
		}
	}
}
