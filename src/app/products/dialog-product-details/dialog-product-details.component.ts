import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';

import { CurrencyService } from 'src/app/shared/services/selext-currency.service';
@Component({
	selector: 'app-dialog-product-details',
	templateUrl: './dialog-product-details.component.html',
	styleUrls: ['./dialog-product-details.component.scss'],
})
export class DialogProductDetailsComponent implements OnInit {
	orderPlaced: boolean = false;
	selectedSize: string | null = null;
	selectedCurrency: string = 'USD';

	constructor(
		private dialog: MatDialog,
		public shoppingBasketService: ShoppingBasketService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private currencyService: CurrencyService
	) {}
	ngOnInit(): void {
		this.currencyService.currency$.subscribe((currency) => {
			this.selectedCurrency = currency;
		});
	}

	selectSize(size: string) {
		this.selectedSize = size;
		this.data.size = this.selectedSize;
	}

	onNoClick() {
		this.dialog.closeAll();
	}

	addToCart() {
		if (this.selectedSize) {
			this.orderPlaced = true;

			const index = this.shoppingBasketService.products.findIndex(
				(obj) => obj.size === this.data.size
			);

			if (index != -1) {
				let baselinePrice =
					this.shoppingBasketService.products[index].price /
					this.shoppingBasketService.products[index].quantity;

				this.shoppingBasketService.products[index].quantity += 1;
				this.shoppingBasketService.products[index].price +=
					baselinePrice;
			} else {
				this.shoppingBasketService.products.push(this.data);
			}

			this.shoppingBasketService.addProduct();
		} else {
			alert('Please select size!');
		}
	}

	/**
	 * Convert price to selected currency (USD, EUR, GBP)
	 * @param price
	 * @returns
	 */
	convertPrice(price: number): number {
		console.log('price', this.selectedCurrency);
		return this.currencyService.convertPrice(price, this.selectedCurrency);
	}
}
