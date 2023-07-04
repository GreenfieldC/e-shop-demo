import { Injectable } from '@angular/core';
import {
	DocumentReference,
	Firestore,
	doc,
	docData,
	getDoc,
	setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AddressesService {
	//products array that get displayed in UI
	addresses: Array<any> = [];
	adressDocRef: DocumentReference;
	adressReference: string;
	currentlyLoggedInUser: string | null;

	constructor(private firestore: Firestore) {}

	async getAdresses() {
		this.adressDocRef = doc(this.firestore, this.adressReference);
		const snap = await getDoc(this.adressDocRef);
		if (snap) {
			this.addresses = snap.data()!['addresses'];
		} else {
			console.error('No document found!');
		}
	}

	async updateAdresses() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.adressDocRef, {
				addresses: this.addresses,
			});
		}
	}
}
