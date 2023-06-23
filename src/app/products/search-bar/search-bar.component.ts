import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
	searchTerm: string = '';
	products: Array<any>;
	showProducts: boolean = false;
	categories: Array<any>;
	selectedCategory: string = 'all';
	isLoading: boolean = false;

	constructor(
		private apiService: ApiService,
		private dialog: MatDialog,
		public exchangeRateService: ExchangeRateService
	) {}

	/**
	 * Gets products and categories from API
	 * and opens products list
	 */
	async getProductsAndCategories() {
		this.getProductsFromService();
		this.getCategoriesFromService();
	}

	/**
	 * Gets products from API
	 */
	getProductsFromService() {
		this.apiService.getProducts.subscribe((data) => {
			this.products = data;
		});
	}

	/**
	 * Gets categories from API
	 */
	getCategoriesFromService() {
		this.apiService.getCategories.subscribe((data) => {
			this.categories = data;
		});
	}

	/**
	 * Opens product details dialog
	 * @param product Object
	 */
	openDetailView(product: any) {
		this.dialog.open(DialogProductDetailsComponent, {
			height: 'fit-content',
			data: product,
		});
	}

	/**
	 * Sets category to filter products
	 * @param category
	 * @returns
	 */
	setsCategory(category: string) {
		this.selectedCategory = category;
	}
}
