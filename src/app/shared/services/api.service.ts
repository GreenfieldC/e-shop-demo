import { Injectable } from '@angular/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { get } from 'firebase/database';
import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	baseUrl = 'https://fakestoreapi.com/products';
	isLoading: boolean = true;

	private fetchData(url: string): Observable<any> {
		return new Observable((observer) => {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					observer.next(data); // next() sends data to the subscriber
					observer.complete(); // complete() ends the communication
					this.isLoading = false;
				})
				.catch((error) => {
					console.log('Error:', error);
					observer.error(error);
				});
		});
	}

	/**
	 * Gets all products from API
	 * @returns {json}
	 */
	get getProducts(): Observable<any> {
		const productsUrl = this.baseUrl;
		return this.fetchData(productsUrl);
	}

	/**
	 * Gets categories from API
	 * @returns {json}
	 */
	get getCategories(): Observable<any> {
		const categoryUrl = this.baseUrl + '/categories';
		return this.fetchData(categoryUrl);
	}

	/**
	 * Gets products of selected category from API
	 * @param selectedCategory
	 * @returns
	 */
	getProductsOfSelectedCategory(selectedCategory: string): Observable<any> {
		const categoryUrl = this.baseUrl + '/category/' + selectedCategory;
		return this.fetchData(categoryUrl);
	}
}
