import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DeliveryAddressService {
	addressSource = new Subject<any>();
	address$ = this.addressSource.asObservable();

	setAddress(address: any) {
		this.addressSource.next(address);
	}

	getAddress() {
		return this.address$;
	}
}
