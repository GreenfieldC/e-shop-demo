import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { ProductReviewService } from 'src/app/shared/services/product-review.service';
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
	reviewCounter: number = 0;

	constructor(
		private dialog: MatDialog,
		public shoppingBasketService: ShoppingBasketService,
		public exchangeRateService: ExchangeRateService,
		private toast: HotToastService,
		private reviewService: ProductReviewService,

		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.checkReviews();
	}

	/**
	 * checkReviews
	 */
	checkReviews() {
		this.reviewService.reviews.forEach((review: any) => {
			if (review.productId === this.data.id) {
				this.reviewCounter++;
			}
		});
	}

	/**
	 * Set size of selected product
	 */
	selectSize(size: string) {
		this.selectedSize = size;
		this.data.size = this.selectedSize;
	}

	/**
	 * Closes the dialog
	 */
	closeDialog() {
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
			if (!this.selectedSize) {
				this.orderPlaced = false;
				this.toast.error('Please select size!');
				return;
			}
			index = this.shoppingBasketService.products.findIndex(
				(obj) => obj.size === this.data.size && obj.title === this.data.title
			);
		}

		if (index !== -1) {
			const product = this.shoppingBasketService.products[index];
			product.quantity++;
			product.price += product.price / product.quantity;
		} else {
			this.shoppingBasketService.products.push(this.data);
			this.toast.success('Product added to cart!');
		}

		this.shoppingBasketService.updateProducts();
	}
}
