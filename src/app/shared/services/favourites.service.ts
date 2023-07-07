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
	private favListDocRef: DocumentReference;

	//favorites array storing the ids that get displayed in UI
	favourites: Array<any> = [];

	//Storing the favourites list of the user
	favouritesList: Array<any> = [];

	//currently logged In User
	currentlyLoggedInUser: string | null;

	//fav reference (ids only)
	favReference: string;

	//favList reference(all prodcuts marked as favourites)
	favListReference: string;

	constructor(public firestore: Firestore) {}

	async getFavs() {
		//asssignment of cart document reference in Firestore
		this.favDocRef = doc(this.firestore, this.favReference);
		this.favListDocRef = doc(this.firestore, this.favListReference);

		//get all ids of favorised items from firebase
		const favSnap = await getDoc(this.favDocRef);
		if (favSnap) {
			this.favourites = favSnap.data()!['favourites'];
		} else {
			console.error('No document found!');
		}

		//get Product Items marked as favourites
		const favListSnap = await getDoc(this.favListDocRef);
		if (favListSnap) {
			this.favouritesList = favListSnap.data()!['favouritesList'];
		} else {
			console.error('No document found!');
		}
	}

	//update all favorites
	async updateFavs() {
		if (this.currentlyLoggedInUser != 'Guest') {
			setDoc(this.favDocRef, {
				favourites: this.favourites,
			});

			setDoc(this.favListDocRef, {
				favouritesList: this.favouritesList,
			});
		}
	}
}
