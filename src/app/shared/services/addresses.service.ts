import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AddressesService {
	constructor(public db: Firestore) {}

	addAddressesToFireBase(authToken: string, addresses: any) {
		setDoc(doc(this.db, `user_${authToken}`, 'addresses'), {
			addresses: addresses,
		});
	}

	/**
	 * Gets the addresses from the database
	 * @returns {Observable<any>}
	 */
	getAddressesFromFireBase$(authToken: string): Observable<any> {
		const docRef = doc(this.db, `user_${authToken}`, 'addresses');
		return docData(docRef);
	}
}
