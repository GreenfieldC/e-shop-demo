import { Component, OnInit } from '@angular/core';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPaymentComponent } from '../dialog-payment/dialog-payment.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface cardDetails {
	number: null | number;
	expiry: null | string;
	CVC: null | number;
	name: null | string;
}

interface billingDetails {
	firstname: null | number;
	lastname: null | string;
	adress: null | string;
	zipcode: null | number;
	city: null | string;
	country: null | string;
}

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
	discountCode: number;
	panelOpenState: boolean = false;
	discountGiven: boolean = false;
	discount: number = 0;
	paymentMethod: string | null = null;
	paymentData: any;
	form: FormGroup;

	billingDetails: billingDetails = {
		firstname: null,
		lastname: null,
		adress: null,
		zipcode: null,
		city: null,
		country: null,
	};

	cardDetails: cardDetails = {
		number: null,
		expiry: null,
		CVC: null,
		name: null,
	};

	constructor(
		public shoppingCartService: ShoppingBasketService,
		public exchangeRateService: ExchangeRateService,
		public dialog: MatDialog,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.initialiseForm();
	}

	initialiseForm() {
		this.form = this.fb.group({
			cardNumber: [
				'',
				[Validators.required, Validators.pattern(/^\d{16}$/)],
			],
			expiry: [
				'',
				[
					Validators.required,
					Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
				],
			],
			cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
			name: ['', [Validators.required, Validators.minLength(1)]],
		});
	}

	get cardNumber() {
		return this.form.get('cardName');
	}
	get expiry() {
		return this.form.get('expiry');
	}
	get cvv() {
		return this.form.get('cvv');
	}
	get cardholder() {
		return this.form.get('name');
	}

	incrementQuantity(i: number, event: Event) {
		event.stopPropagation();
		this.shoppingCartService.products[i].quantity += 1;
		this.shoppingCartService.updateProducts();
	}

	decreaseQuantity(i: number, event: Event) {
		event.stopPropagation();

		if (this.shoppingCartService.products[i].quantity === 1) {
			this.shoppingCartService.products.splice(i, 1);
		} else {
			this.shoppingCartService.products[i].quantity -= 1;
		}

		this.shoppingCartService.updateProducts();
	}

	validateDiscount() {
		this.shoppingCartService.couponCodes.forEach((coupon) => {
			if (coupon.code == this.discountCode) {
				this.discountGiven = true;
				this.discount = coupon.discount;
			} else {
				this.discountGiven = false;
				this.discount = 0;
			}
		});
	}

	selectPayment(payment: string) {
		this.paymentMethod = payment;
	}

	openPaymentDialog() {
		if (this.paymentMethod) {
			if (this.paymentMethod === 'credit') {
				this.paymentData = this.cardDetails;
			} else {
				this.paymentData = this.billingDetails;
			}

			this.dialog.open(DialogPaymentComponent, {
				data: {
					payment: this.paymentMethod,
					total:
						(this.shoppingCartService.shippingCosts +
							this.shoppingCartService.totalPrice -
							this.discount) *
						this.exchangeRateService.selectedRate,
					currency: this.exchangeRateService.icon,
					paymentData: this.paymentData,
				},
			});
		} else {
			alert('Please select a payment method'!);
		}
	}
}
