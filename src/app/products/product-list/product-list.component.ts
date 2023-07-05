import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
	products: Array<any>;
	selected: boolean = false;
	favourites: any = [];

	constructor(
		private apiService: ApiService,
		private dialog: MatDialog,
		public exchangeRateService: ExchangeRateService,
		public favouritesService: FavouritesService
	) {
		this.apiService.getProducts.subscribe((data) => {
			data.forEach((obj: any) => {
				obj.quantity = 1;
				obj.size = '';
			});
			this.products = data;
		});
		this.favouritesService.getFavourites$().subscribe((data) => {
			this.favourites = data['favourites'];
			console.log(data);
		});
	}

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

	toggleSelected(i: number) {
		this.favourites[i]!.favourite = !this.favourites[i]!.favourite;
		console.log('i', i, this.favourites[i].favourite);
	}
}
