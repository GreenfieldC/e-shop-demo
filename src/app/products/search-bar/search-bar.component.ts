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

	openDetailView(product: any) {
		this.dialog.open(DialogProductDetailsComponent, {
			height: 'fit-content',
			data: product,
		});
	}
}
