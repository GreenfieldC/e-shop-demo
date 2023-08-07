import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class ProductReviewService {
	constructor(private fs: Firestore) {}

	reviewDoc: string = 'reviews/reviews';
	reviews: Array<any> = [];

	/**
	 * Get all product reviews present in firebase
	 */
	async getProductReviews() {
		let reviewRef = doc(this.fs, this.reviewDoc);
		let snapshot = await getDoc(reviewRef);
		let data = snapshot.data();
		this.reviews = data!['reviews'];
	}

	/**
	 * Upload Review
	 */
	async addProductReview() {
		setDoc(doc(this.fs, this.reviewDoc), { reviews: this.reviews });
	}
}
