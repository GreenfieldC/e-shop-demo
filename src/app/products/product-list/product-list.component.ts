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
		// console.log(product);
	}
}
