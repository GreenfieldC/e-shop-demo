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
export class FavouritesService {
	favouritesReference: string = '';
	// favouritesSource:
	favourites: Array<any> = [];
	favourites$!: Observable<any>;

	constructor(public db: Firestore) {
		this.getFavourites$().subscribe((data) => {
			this.favourites = data;
			console.log(typeof this.favourites);
		});
	}

	// async getFavourites() {
	// 	const docRef = doc(this.db, this.favouritesReference);
	// 	const snap = await getDoc(docRef);
	// 	if (snap) {
	// 		this.favourites = snap.data()!['favourites'];
	// 		console.log(this.favourites);
	// 	} else {
	// 		console.error('No document found!');
	// 	}
	// }

	getFavourites$(): Observable<any> {
		console.log(this.favouritesReference);
		const docRef = doc(this.db, 'user_srVVQnKCTTRFQqWOd08yrNTRWfB2/favourites');
		return docData(docRef);
	}

	setFavouritesReference(reference: string) {
		this.favouritesReference = reference;
		console.log(this.favouritesReference);
	}

	updateFavourites() {
		const docRef = doc(this.db, 'user_srVVQnKCTTRFQqWOd08yrNTRWfB2/favourites');
		setDoc(docRef, {
			favourites: this.favourites,
		});
	}
}
