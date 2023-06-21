import { Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DialogProductDetailsComponent } from '../dialog-product-details/dialog-product-details.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
	products: Array<any>;

	constructor(private apiService: ApiService, private dialog: MatDialog) {
		this.apiService.getProducts.subscribe((data) => {
			data.forEach((obj: any) => {
				obj.quantity = 1;
				obj.size = '';
			});
			this.products = data;
		});
	}

	openDetailView(product: any) {
		this.dialog.open(DialogProductDetailsComponent, {
			height: 'fit-content',
			data: product,
		});
		console.log(product);
	}
}
