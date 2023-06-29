import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	setDoc,
	DocumentReference,
} from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class ShoppingBasketService {
	//document reference in Firestore
	private cartDocRef: DocumentReference;

	private couponDocRef: DocumentReference;

	//products array that get displayed in UI
	products: Array<any> = [];

	//currently logged In User
	currentlyLoggedInUser: string | null;

	cartReference: string;

	//total price
	totalPrice: number = 0;

	//shipping costs
	shippingCosts: number = 2.5;

	//coupon code
	couponCodes: Array<any>;

	constructor(private firestore: Firestore) {}

	async getUserData() {
		//asssignment of cart document reference in Firestore
		this.cartDocRef = doc(this.firestore, this.cartReference);

		//asssignment of coupon_codes document reference in Firestore
		this.couponDocRef = doc(this.firestore, 'coupon_codes/codes');

		//real time listener of prodcuts in database
		onSnapshot(this.cartDocRef, (doc) => {
			this.products = doc.data()?.['products'] || [];
			this.totalPrice = 0;
			this.products.forEach((product) => {
				this.totalPrice += product.price * product.quantity;
				if (this.totalPrice > 250) {
					this.shippingCosts = 0;
				} else {
					this.shippingCosts = 2.5;
				}
			});
		});

		//real time listener of coupon codes in database
		onSnapshot(this.couponDocRef, (doc) => {
			this.couponCodes = doc.data()?.['codes'];
		});
	}

	async updateProducts() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.cartDocRef, {
				products: this.products,
			});
		} else {
			this.totalPrice = 0;
			this.products.forEach((product) => {
				this.totalPrice += product.price * product.quantity;
				if (this.totalPrice > 250) {
					this.shippingCosts = 0;
				} else {
					this.shippingCosts = 2.5;
				}
			});
		}
	}
}
