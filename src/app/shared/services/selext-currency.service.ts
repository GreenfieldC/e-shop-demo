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
}
