import { Component, OnInit } from '@angular/core';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPaymentComponent } from '../dialog-payment/dialog-payment.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressesService } from 'src/app/shared/services/addresses.service';

/**
 * interface for the Credit Card Details entered by the user
 */
interface cardDetails {
	number: null | number;
	expiry: null | string;
	cvv: null | number;
	name: null | string;
}

/**
 * interface for the Debit/ Billing Details entered by the user
 */
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
	form1: FormGroup;
	form2: FormGroup;

	deliveryAddress: Object = {
		firstname: null,
		lastname: null,
		street: null,
		zipcode: null,
		city: null,
		country: null,
	};

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
		cvv: null,
		name: null,
	};

	// Component code
	countries = [
		'Albania',
		'Andorra',
		'Australia',
		'Austria',
		'Belarus',
		'Belgium',
		'Bosnia and Herzegovina',
		'Bulgaria',
		'Canada',
		'China',
		'Croatia',
		'Cyprus',
		'Czech Republic',
		'Denmark',
		'Estonia',
		'Finland',
		'France',
		'Germany',
		'Greece',
		'Hungary',
		'Iceland',
		'Ireland',
		'Italy',
		'Kosovo',
		'Latvia',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Malta',
		'Moldova',
		'Monaco',
		'Montenegro',
		'Netherlands',
		'North Macedonia',
		'Norway',
		'Poland',
		'Portugal',
		'Romania',
		'Russia',
		'San Marino',
		'Serbia',
		'Slovakia',
		'Slovenia',
		'Spain',
		'Sweden',
		'Switzerland',
		'Ukraine',
		'United Kingdom',
		'United States',
	];

	constructor(
		public shoppingCartService: ShoppingBasketService,
		public exchangeRateService: ExchangeRateService,
		public dialog: MatDialog,
		private fb: FormBuilder,
		private aS: AddressesService
	) {
		this.initialiseForms();
		this.aS.defaultAddress$.subscribe((address) => {
			this.deliveryAddress = address;
			console.log('test', this.deliveryAddress);
		});
	}

	ngOnInit() {}

	/**
	 * 	initialisation of the card infirmation forms
	 */
	initialiseForms() {
		this.form1 = this.fb.group({
			cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}\s*$/)]],
			expiry: [
				'',
				[Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}\s*$/)],
			],
			cvv: ['', [Validators.required, Validators.pattern(/^\d{3}\s*$/)]],
			name: [
				'',
				[Validators.required, Validators.pattern(/^[A-Za-z]+\s+[A-Za-z]+\s*$/)],
			],
		});

		this.form2 = this.fb.group({
			firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			adress: ['', [Validators.required, Validators.pattern(/^(?=.*\d).*\s*$/)]],
			zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}\s*$/)]],
			city: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			country: ['', [Validators.required]],
		});
	}

	/**
	 * getting credit Card details from form
	 */
	get cardNumber() {
		return this.form1.get('cardNumber');
	}
	get expiry() {
		return this.form1.get('expiry');
	}
	get cvv() {
		return this.form1.get('cvv');
	}
	get name() {
		return this.form1.get('name');
	}

	/**
	 * getting Debit Details from form
	 */

	get firstname() {
		return this.form2.get('firstname');
	}
	get lastname() {
		return this.form2.get('lastname');
	}
	get adress() {
		return this.form2.get('adress');
	}
	get zipcode() {
		return this.form2.get('zipcode');
	}
	get city() {
		return this.form2.get('city');
	}
	get country() {
		return this.form2.get('country');
	}

	/**
	 * Increasing product quantity by 1
	 * @param i index of product in product array
	 * @param event click event to prevent bubbling
	 */
	incrementQuantity(i: number, event: Event) {
		event.stopPropagation();
		this.shoppingCartService.products[i].quantity += 1;
		this.shoppingCartService.updateProducts();
	}

	/**
	 * Decrease product quantity by 1
	 * @param i index of product in product array
	 * @param event click event to prevent bubbling
	 */
	decreaseQuantity(i: number, event: Event) {
		event.stopPropagation();

		if (this.shoppingCartService.products[i].quantity === 1) {
			this.shoppingCartService.products.splice(i, 1);
		} else {
			this.shoppingCartService.products[i].quantity -= 1;
		}

		this.shoppingCartService.updateProducts();
	}

	/**
	 * Validate the entered discount code and deduct stored quantity from order
	 */
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

	/**
	 * Select Payment Method
	 * @param payment payment string literal that was chosen by user
	 */
	selectPayment(payment: string) {
		this.paymentMethod = payment;
	}

	/**
	 * setCreditData()
	 */
	setCreditData() {
		this.cardDetails = {
			number: this.cardNumber!.value,
			expiry: this.expiry!.value,
			cvv: this.cvv!.value,
			name: this.name!.value,
		};
		this.paymentData = this.cardDetails;
	}

	/**
	 * setDebitData() {
	 *
	 */
	setDebitData() {
		this.billingDetails = {
			firstname: this.firstname!.value,
			lastname: this.lastname!.value,
			adress: this.adress!.value,
			zipcode: this.zipcode!.value,
			city: this.city!.value,
			country: this.country!.value,
		};

		this.paymentData = this.billingDetails;
	}

	/**
	 * Open Final Checkout Dialog and inject payment & order data
	 */
	openPaymentDialog() {
		if (this.paymentMethod) {
			if (this.paymentMethod === 'credit' && this.form1.valid) {
				this.setCreditData();
				this.openDialog();
			} else if (this.paymentMethod === 'debit' && this.form2.valid) {
				this.setDebitData();
				this.openDialog();
			} else {
				alert('Please complete form with valid data!');
			}
		} else {
			alert('Please select a payment method'!);
		}
	}

	/**
	 * Function that triggers payment dialog
	 */
	openDialog() {
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
				shipping: this.shoppingCartService.shippingCosts,
				deliveryAddress: this.deliveryAddress,
			},
		});
	}
}
