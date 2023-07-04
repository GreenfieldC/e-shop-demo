import { Injectable } from '@angular/core';
import { DocumentReference, Firestore } from '@angular/fire/firestore';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class OrderHistoryService {
	orders: Array<any> = [];
	orderDocRef: DocumentReference;
	orderReference: string;
	currentlyLoggedInUser: string | null;

	constructor(private firestore: Firestore) {}

	async getOrders() {
		this.orderDocRef = doc(this.firestore, this.orderReference);

		onSnapshot(this.orderDocRef, (doc) => {
			this.orders = doc.data()?.['orders'] || [];
		});
	}

	async updateOrders() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.orderDocRef, {
				orders: this.orders,
			});
		}
		console.log(this.orders);
	}
}
