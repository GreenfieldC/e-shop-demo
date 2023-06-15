import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	setDoc,
	DocumentReference,
} from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ShoppingBasketService {
	//document reference in Firestore
	private cartDocRef: DocumentReference;

	//products array that get displayed in UI
	products: Array<any> = [];

	//total price
	totalPrice: number = 0;

	//shipping costs
	shippingCosts: number = 2.5;

	constructor(private firestore: Firestore) {
		//asssignment of document reference in Firestore
		this.cartDocRef = doc(this.firestore, 'user_guest/cart');

		//built-in observable creator that establishes real time listener of database
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
	}

	async updateProducts() {
		setDoc(this.cartDocRef, {
			products: this.products,
		});
	}
}
