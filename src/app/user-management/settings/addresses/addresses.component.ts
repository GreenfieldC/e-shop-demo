import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { AddressesService } from 'src/app/shared/services/addresses.service';
import { DeliveryAddressService } from 'src/app/shared/services/delivery-address.service';
@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
	@ViewChild(MatAccordion) accordion: MatAccordion;
	form: FormGroup;
	addresses: Array<any> = [];
	authToken: any;
	ngOnInit(): void {}

	getAuthTokenFromLocalStorage() {
		const authTokenObjectAsString = localStorage.getItem('authToken');
		if (!authTokenObjectAsString) return;
		const authTokenObject = JSON.parse(authTokenObjectAsString);
		this.authToken = authTokenObject.id;
		console.log(this.authToken);
	}

	constructor(
		private fb: FormBuilder,
		private deliveryAddressService: DeliveryAddressService,
		private aS: AddressesService
	) {
		this.initialiseForm();
		this.getAuthTokenFromLocalStorage();
		this.aS.getAddressesFromFireBase$(this.authToken).subscribe((data) => {
			if (!data) return; // return if data is undefined
			this.addresses = data.addresses;
		});
		this.deliveryAddressService.getAddress().subscribe((data) => {
			console.log('s', data);
		});
	}

	/**
	 * initialise the form with the validators
	 */
	initialiseForm() {
		this.form = this.fb.group({
			firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			street: ['', Validators.required],
			zipCode: ['', Validators.required],
			city: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			country: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
		});
	}

	/**
	 *Save the form data to the database
	 * @returns {void}
	 */
	submit() {
		if (!this.form.valid) return;
		this.addresses.push(this.form.value);
		this.aS.addAddressesToFireBase(this.authToken, this.addresses);
		this.form.reset();
		this.singelAddressToDefault();
	}

	/**
	 *Deletes an address from the database
	 * @param {number} index
	 */
	deleteAddress(index: number) {
		this.addresses.splice(index, 1);
		this.aS.addAddressesToFireBase(this.authToken, this.addresses);
		this.singelAddressToDefault();
	}

	/**
	 * Sets and saves the default address
	 * @param {number} index
	 */
	setDefaultAddress(index: number) {
		this.addresses.forEach((address) => {
			address.isDefault = false;
		});
		this.addresses[index].isDefault = true;
		this.aS.addAddressesToFireBase(this.authToken, this.addresses);
	}

	singelAddressToDefault() {
		if (this.addresses.length === 1) this.setDefaultAddress(0);
	}
}
