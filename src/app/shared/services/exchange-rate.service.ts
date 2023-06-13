import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ExchangeRateService {
	URL: string = 'http://api.exchangeratesapi.io/v1/';
	key: string;

	constructor() {
		this.key = environment.exchangeRatesKey;
		console.log(this.key);
	}

	getExchangeRate(base: string, symbols: string): Promise<any> {
		return fetch(
			`${this.URL}latest?access_key=${this.key}&base=${base}&symbols=${symbols}`
		).then((response) => response.json());
	}
}
