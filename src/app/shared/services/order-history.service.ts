import { Injectable } from '@angular/core';
import { DocumentReference, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

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
		const snap = await getDoc(this.orderDocRef);
		if (snap) {
			this.orders = snap.data()!['orders'];
		} else {
			console.error('No document found!');
		}
	}

	async updateOrders() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.orderDocRef, {
				orders: this.orders,
			});
		}
	}
}
