import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';

@Component({
	selector: 'app-dialog-product-details',
	templateUrl: './dialog-product-details.component.html',
	styleUrls: ['./dialog-product-details.component.scss'],
})
export class DialogProductDetailsComponent {
	orderPlaced: boolean = false;

	constructor(
		private dialog: MatDialog,
		public shoppingBasketService: ShoppingBasketService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	onNoClick() {
		this.dialog.closeAll();
	}

	addToBasket() {
		this.orderPlaced = true;
		this.shoppingBasketService.items.push(this.data);
		this.shoppingBasketService.totalPrice += this.data.price;
		this.shoppingBasketService.addItem();
	}
}
