import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	setDoc,
	DocumentReference,
	docData,
} from '@angular/fire/firestore';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserDetailsService {
	userDetailsReference: string;
	userDetails: any;
	constructor(private firestore: Firestore) {}

	async getUserDetails() {
		const docRef = doc(this.firestore, this.userDetailsReference);
		const docSnap = await getDoc(docRef);
		if (docSnap) {
			this.userDetails = docSnap.data()!['userDetails'];
			console.log(this.userDetails);
		}
	}

	async updateUserDetails(changes: any) {
		const docRef = doc(this.firestore, this.userDetailsReference);
		console.log(this.userDetailsReference);
		await setDoc(docRef, {
			userDetails: changes,
		});
	}
}
