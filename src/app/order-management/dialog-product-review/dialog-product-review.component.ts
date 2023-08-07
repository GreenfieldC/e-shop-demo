import { Component, ElementRef, Inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductReviewService } from 'src/app/shared/services/product-review.service';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
	selector: 'app-dialog-product-review',
	templateUrl: './dialog-product-review.component.html',
	styleUrls: ['./dialog-product-review.component.scss'],
})
export class DialogProductReviewComponent {
	stars: any = Array.from({ length: 5 }, () => ({ isSelected: false }));

	form: FormGroup;
	counter: number = 0;

	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public product: any,
		private dialog: MatDialog,
		public reviewService: ProductReviewService,
		public shoppingCartService: ShoppingBasketService,
		private toast: HotToastService
	) {}

	ngOnInit() {
		this.initialiseForm();
	}

	/**
	 * Initialise the form
	 */
	initialiseForm() {
		this.form = this.fb.group({
			message: [''],
		});
	}

	/**
	 * Get user message/ review
	 */
	get reviewMessage() {
		return this.form.get('message');
	}

	/**
	 * Set stars
	 */
	fillStars(index: number) {
		for (let i = 0; i < this.stars.length; i++) {
			if (index >= i) {
				this.stars[i].isSelected = true;
			} else {
				this.stars[i].isSelected = false;
			}
		}
	}

	/**
	 * Add Form submit
	 */
	onSubmit() {
		if (this.validateForm()) {
			let review = {
				username: this.shoppingCartService.currentlyLoggedInUser,
				review: this.reviewMessage!.value,
				date: new Date(),
				stars: this.counter,
				productId: this.product.id,
			};

			this.reviewService.reviews.push(review);
			this.reviewService.addProductReview();

			this.dialog.closeAll();
			this.toast.success('Product review successfully submitted!');
		}
	}

	/**
	 * validate Form
	 */
	validateForm() {
		this.stars.forEach((star: any) => {
			if (star.isSelected) {
				this.counter++;
			}
		});

		if (this.counter === 0) {
			this.toast.error('Please select stars to give a rating!');
			return false;
		} else if (this.reviewMessage!.value.length < 5) {
			this.toast.error('Review must be at least 5 characters long!');
			return false;
		} else {
			return true;
		}
	}

	/**
	 * close Dialog
	 */

	closeDialog() {
		this.dialog.closeAll();
	}
}
