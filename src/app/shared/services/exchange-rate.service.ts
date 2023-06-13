import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ExchangeRateService {
	URL: string = 'https://open.er-api.com/v6/latest/USD';
	exchangeRates: any;
	selectedCurrency: string = 'USD';
	selectedRate: number = 1;
	icon: string = '\u0024';

	async getExchangeRates() {
		if (localStorage.getItem('exchangeRates')) {
			const storedData = localStorage.getItem('exchangeRates') as string;
			this.exchangeRates = JSON.parse(storedData);
		} else {
			let data = await fetch(this.URL);
			let response = await data.json();
			this.exchangeRates = response;

			localStorage.setItem(
				'exchangeRates',
				JSON.stringify(this.exchangeRates.rates)
			);
		}
	}
}
