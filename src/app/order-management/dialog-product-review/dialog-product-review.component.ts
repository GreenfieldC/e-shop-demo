import { Component, ElementRef, Inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-product-review',
	templateUrl: './dialog-product-review.component.html',
	styleUrls: ['./dialog-product-review.component.scss'],
})
export class DialogProductReviewComponent {
	stars: any = Array.from({ length: 5 }, () => ({ isSelected: false }));

	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public product: any,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.initialiseForm();
		console.log(this.product);
	}

	/**
	 * Initialise the form
	 */
	initialiseForm() {
		this.form = this.fb.group({
			message: ['', [Validators.minLength(15), Validators.required]],
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
	onSubmit() {}

	/**
	 * close Dialog
	 */

	closeDialog() {
		this.dialog.closeAll();
	}
}
