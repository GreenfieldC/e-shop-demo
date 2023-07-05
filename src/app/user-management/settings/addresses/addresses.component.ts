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
export class AddressesComponent {
	@ViewChild(MatAccordion) accordion: MatAccordion;
	form: FormGroup;

	constructor(private fb: FormBuilder, public aS: AddressesService) {
		this.initialiseForm();
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
		this.aS.addresses.push(this.form.value);
		this.form.reset();
		this.aS.updateAdresses();
	}

	/**
	 * Sets and saves the default address
	 * @param {number} index
	 */
	setDefaultAddress(index: number) {
		if (this.aS.addresses.length === 1) {
			this.aS.addresses[0].isDefault = true;
		} else {
			this.aS.addresses.forEach((address) => {
				address.isDefault = false;
			});
			this.aS.addresses[index].isDefault = true;
		}

		this.aS.updateAdresses();
	}

	getDefaultAddress() {
		const defaultAddress = this.aS.addresses.filter(
			(address) => address.isDefault === true
		);
		if (defaultAddress.length === 0) return;
	}

	/**
	 *Deletes an address from the database
	 * @param {number} index
	 */
	deleteAddress(index: number) {
		this.aS.addresses.splice(index, 1);
		this.aS.updateAdresses();
	}
}
