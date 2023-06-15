import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ProductItemComponent } from 'src/app/products/product-item/product-item.component';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
	searchTerm: string;
	products: Array<any>;

	constructor(private apiService: ApiService) {
		this.apiService.getProducts.subscribe((data) => {
			/* 	data.forEach((obj: any) => {
				obj.quantity = 1;
				obj.size = '';
			}); */
			this.products = data;
			console.log(this.products);
		});
	}
}
