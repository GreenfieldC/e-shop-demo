import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
	form: FormGroup;
	ngOnInit(): void {
		// throw new Error('Method not implemented.');
	}

	constructor(private fb: FormBuilder) {
		this.initialiseForm();
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

	submit() {
		if (!this.form.valid) {
			console.log('form is invalid');
			return;
		}
	}

	isFormControlInvalid(controlName: any): boolean {
		const control = controlName;
		return control.invalid && (control.dirty || control.touched);
	}
}
