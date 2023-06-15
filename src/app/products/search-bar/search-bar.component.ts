import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
	searchTerm: string;
	products: Array<any>;
	showProducts: boolean = false;
	categories: Array<any>;
	selectedCategory: string = 'all';

	constructor(private apiService: ApiService, private dialog: MatDialog) {
		this.getProductsFromService();
		this.apiService.getCategories.subscribe((data) => {
			this.categories = data;
			console.log(this.categories);
		});
	}

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
	 * Opens product details dialog
	 * @param product Object
	 */
	openDetailView(product: any) {
		this.dialog.open(DialogProductDetailsComponent, {
			height: 'fit-content',
			data: product,
		});
	}

	filterProducts(category: string) {
		this.selectedCategory = category;

		if (category === 'all') {
			this.getProductsFromService();
			return;
		}

		this.apiService
			.getProductsOfSelectedCategory(category)
			.subscribe((data) => {
				this.products = data;
				console.log(this.products);
			});
	}
}
