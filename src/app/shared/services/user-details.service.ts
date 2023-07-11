import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	setDoc,
	DocumentReference,
	docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserDetailsService {
	userDetailsReference: string;
	userDetails$: Observable<any>;

	constructor(private firestore: Firestore) {}

	getUserDetails() {
		const docRef = doc(this.firestore, this.userDetailsReference);
		return docData(docRef);
	}

	async updateUserDetails(changes: any) {
		const docRef = doc(this.firestore, this.userDetailsReference);
		await setDoc(docRef, {
			userDetails: changes,
		});
	}
}
