import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ShoppingBasketService {
	//working version/ no permanent storage
	items: Array<any> = [];
	totalPrice: number = 0;

	//start of firebase integration
	items$: Observable<any>;
	collection: any;

	constructor(private firestore: Firestore) {
		this.collection = collection(this.firestore, 'user_guest');
		this.getAll();
	}

	async getAll() {
		let items$ = await getDocs(this.collection);
		console.log(items$);
	}

	async addItem() {
		await addDoc(this.collection, { items: this.items });
	}
}
