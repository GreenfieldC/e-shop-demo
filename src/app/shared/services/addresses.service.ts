import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AddressesService {
	defaultAddressSource = new BehaviorSubject<any>(null);
	defaultAddress$ = this.defaultAddressSource.asObservable();
	defaultAddress!: Object;

	setDefaultAddress(address: any) {
		this.defaultAddressSource.next(address);
	}

	constructor(public db: Firestore) {
		//subscribe to the default address
		this.defaultAddress$.subscribe((data) => {
			this.defaultAddress = data;
			console.log(this.defaultAddress);
		});
	}

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
