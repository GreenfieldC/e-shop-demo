import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';

@Component({
	selector: 'app-dialog-product-details',
	templateUrl: './dialog-product-details.component.html',
	styleUrls: ['./dialog-product-details.component.scss'],
})
export class DialogProductDetailsComponent {
	orderPlaced: boolean = false;
	selectedSize: string | null = null;
	selectedCurrency: string = 'USD';
	minimumOrderValue = 250;

	constructor(
		private dialog: MatDialog,
		public shoppingBasketService: ShoppingBasketService,
		public exchangeRateService: ExchangeRateService,
		private toast: HotToastService,

		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	selectSize(size: string) {
		this.selectedSize = size;
		this.data.size = this.selectedSize;
	}

	onNoClick() {
		this.dialog.closeAll();
	}

	addToCart() {
		this.orderPlaced = true;

		let index = -1;

		if (!this.data.category.includes('clothing')) {
			index = this.shoppingBasketService.products.findIndex(
				(obj) => obj.title === this.data.title
			);
		} else {
			if (this.selectedSize) {
				index = this.shoppingBasketService.products.findIndex(
					(obj) => obj.size === this.data.size && obj.title === this.data.title
				);
			} else {
				this.orderPlaced = false;
				this.toast.error('Please select size!');
				return;
			}
		}

		if (index !== -1) {
			let baselinePrice =
				this.shoppingBasketService.products[index].price /
				this.shoppingBasketService.products[index].quantity;

			this.shoppingBasketService.products[index].quantity += 1;
			this.shoppingBasketService.products[index].price += baselinePrice;
		} else {
			this.shoppingBasketService.products.push(this.data);
			this.toast.success('Product added to cart!');
		}

		this.shoppingBasketService.updateProducts();
	}
}
