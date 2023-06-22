import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import {
	Observable,
	Subject,
	debounceTime,
	distinctUntilChanged,
	filter,
	of,
	switchMap,
} from 'rxjs';

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
	searchInput$ = new Subject<string>();
	results$: Observable<any>;

	constructor(
		private apiService: ApiService,
		private dialog: MatDialog,
		public exchangeRateService: ExchangeRateService
	) {
		this.getProductsFromService();
		this.getCategoriesFromService();
	}

	searchValue: string = '';

	/**
	 * Gets products from API
	 */
	getProductsFromService() {
		this.apiService.getProducts.subscribe((data) => {
			this.products = data;
			console.log(this.products);
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
	 * Filters products by category
	 * @param category
	 * @returns
	 */
	showsCategory(category: string) {
		/* 	if (category === 'all') {
			this.getProductsFromService();
			return;
		} */
		this.selectedCategory = category;
		console.log(this.selectedCategory);
	}
}
