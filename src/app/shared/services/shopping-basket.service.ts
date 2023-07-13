import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { getDoc, onSnapshot } from 'firebase/firestore';

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
	couponCodes: Array<any> = [];

	constructor(private firestore: Firestore) {}

	async getUserData() {
		//asssignment of cart document reference in Firestore
		this.cartDocRef = doc(this.firestore, this.cartReference);

		//asssignment of coupon_codes document reference in Firestore
		this.couponDocRef = doc(this.firestore, 'coupon_codes/codes');

		//get all products stored in cart in database
		const productSnap = await getDoc(this.cartDocRef);
		if (productSnap) {
			this.products = productSnap.data()!['products'];
			this.calculatePrices();
		} else {
			console.error('No document found!');
		}

		//get all coupon codes stored in database
		const couponSnap = await getDoc(this.couponDocRef);
		if (couponSnap) {
			this.couponCodes = couponSnap.data()!['codes'];
		} else {
			console.error('No document found!');
		}
	}

	//calculate the total price of all items
	calculatePrices() {
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

	//update all products
	async updateProducts() {
		if (this.currentlyLoggedInUser !== 'Guest') {
			await setDoc(this.cartDocRef, {
				products: this.products,
			});
		}
		this.calculatePrices();
	}

	//update discount codes
	async updateCodes() {
		setDoc(this.couponDocRef, {
			codes: this.couponCodes,
		});
	}
}
