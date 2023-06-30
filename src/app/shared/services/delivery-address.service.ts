import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DeliveryAddressService {
	private addressSource = new Subject<any>();
	address$: Observable<any> = this.addressSource.asObservable();

	setAddress(address: any) {
		this.addressSource.next(address);
	}

	getAddress(): Observable<any> {
		return this.address$;
	}
}
