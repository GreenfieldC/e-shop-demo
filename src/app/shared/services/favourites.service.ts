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
	private favDocRef: DocumentReference;

	//favorites array storing the ids that get displayed in UI
	favourites: Array<any> = [];

	//currently logged In User
	currentlyLoggedInUser: string | null;

	favReference: string;

	constructor(public firestore: Firestore) {}

	async getFavs() {
		//asssignment of cart document reference in Firestore
		this.favDocRef = doc(this.firestore, this.favReference);

		//get all ids of favorised items from firebase
		const favSnap = await getDoc(this.favDocRef);
		if (favSnap) {
			this.favourites = favSnap.data()!['favourites'];
		} else {
			console.error('No document found!');
		}
	}

	//update all products
	async updateFavs() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.favDocRef, {
				favourites: this.favourites,
			});
		}
	}
}
