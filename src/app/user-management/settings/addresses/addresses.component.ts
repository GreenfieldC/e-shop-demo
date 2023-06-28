import { Component, OnInit, ViewChild } from '@angular/core';
import {
	Firestore,
	doc,
	docData,
	getDoc,
	setDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
	@ViewChild(MatAccordion) accordion: MatAccordion;
	form: FormGroup;
	addresses: Array<any> = [];
	ngOnInit(): void {
		// throw new Error('Method not implemented.');
	}

	constructor(private fb: FormBuilder, private db: Firestore) {
		this.initialiseForm();
		this.getAddresses$().subscribe((data) => {
			this.addresses = data.addresses;
			console.log(this.addresses);
		});
	}

	/**
	 * initialise the form with the validators
	 */
	initialiseForm() {
		this.form = this.fb.group({
			firstName: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[A-Za-z]+\s*$/),
				],
			],
			lastName: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[A-Za-z]+\s*$/),
				],
			],
			street: ['', Validators.required],
			zipCode: ['', Validators.required],
			city: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[A-Za-z]+\s*$/),
				],
			],
			country: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[A-Za-z]+\s*$/),
				],
			],
		});
	}

	isFormControlInvalid(controlName: any): boolean {
		const control = controlName;
		return control.invalid && (control.dirty || control.touched);
	}

	/**
	 *Save the form data to the database
	 * @returns {void}
	 */
	submit() {
		if (!this.form.valid) {
			console.log('form is invalid');
			return;
		}

		this.addresses.push(this.form.value);

		setDoc(
			doc(
				this.db,
				'user_ADBZlQ4MpQOwAa2mMnyq5vrCzwr2', // das muss noch dynamisch werden
				'addresses'
			),
			{ addresses: this.addresses }
		);
		this.form.reset();
	}

	/**
	 * Gets the addresses from the database
	 * @returns {Observable<any>}
	 */
	getAddresses$(): Observable<any> {
		const docRef = doc(
			this.db,
			'user_ADBZlQ4MpQOwAa2mMnyq5vrCzwr2',
			'addresses'
		);
		return docData(docRef);
	}
}
