import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
	selected: string = 'ACCOUNT SETTINGS';
	form: FormGroup;
	addresses: any[];

	constructor(private fb: FormBuilder) {
		this.initialiseForm();
	}

	submit() {
		console.log(this.form.value);
	}

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
			company: [''],
			phone: ['', Validators.required],
			email: ['', Validators.required],
			password: [''],
			passwordConfirm: [''],
			passwordCurrent: ['', Validators.required],
		});
	}
}
