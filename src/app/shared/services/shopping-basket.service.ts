import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {
	Firestore,
	doc,
	setDoc,
	getDoc,
	DocumentData,
	CollectionReference,
	updateDoc,
	DocumentReference,
} from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ShoppingBasketService {
	private cartDocRef: DocumentReference;
	products: Array<any> = [];
	totalPrice: number = 0;

	constructor(private firestore: Firestore) {
		this.cartDocRef = doc(this.firestore, 'user_guest/cart');
		onSnapshot(this.cartDocRef, (doc) => {
			this.products = doc.data()?.['products'] || [];
		});
	}

	async addProduct() {
		setDoc(this.cartDocRef, {
			products: this.products,
		});
	}
}
