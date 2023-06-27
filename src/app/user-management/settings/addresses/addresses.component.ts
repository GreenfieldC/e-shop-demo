import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
	ngOnInit(): void {
		// throw new Error('Method not implemented.');
	}

	addressForm = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		street: new FormControl('', Validators.required),
		zipCode: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		country: new FormControl('', Validators.required),
	});

	get firstName() {
		return this.addressForm.get('firstName');
	}

	get lastName() {
		return this.addressForm.get('lastName');
	}

	get street() {
		return this.addressForm.get('street');
	}

	get zipCode() {
		return this.addressForm.get('zipCode');
	}

	get city() {
		return this.addressForm.get('city');
	}

	get country() {
		return this.addressForm.get('country');
	}
}
