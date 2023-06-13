import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	private currencySubject = new Subject<string>();
	currency$ = this.currencySubject.asObservable();

	setCurrency(currency: string): void {
		this.currencySubject.next(currency);
	}

	/**
	 * Convert price to selected currency (USD, EUR, GBP)
	 * @param price
	 * @param selectedCurrency
	 * @returns number
	 */
	convertPrice(price: number, selectedCurrency: string): number {
		if (selectedCurrency === 'USD') {
			return price;
		} else if (selectedCurrency === 'EUR') {
			return price * 0.93;
		} else if (selectedCurrency === 'GBP') {
			return price * 0.81;
		} else {
			return price;
		}
	}
}
