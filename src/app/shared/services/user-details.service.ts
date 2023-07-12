import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	setDoc,
	DocumentReference,
	docData,
	getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserDetailsService {
	//details object that contains user data
	data: any;
	dataDocRef: DocumentReference;
	dataReference: string;
	currentlyLoggedInUser: string | null;

	constructor(private firestore: Firestore) {}

	async getUserData() {
		this.dataDocRef = doc(this.firestore, this.dataReference);
		const snap = await getDoc(this.dataDocRef);

		if (snap) {
			this.data = snap.data()!['userDetails'];
		} else {
			console.error('No user data found!');
		}
	}

	//update User Information on Server
	async updateUserDetails() {
		if (this.currentlyLoggedInUser != 'Guest') {
			await setDoc(this.dataDocRef, {
				userDetails: this.data,
			});
		}
	}
}
