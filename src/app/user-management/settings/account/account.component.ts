import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
	selected: string = 'ACCOUNT SETTINGS';
	form: FormGroup;
	addresses: any[];
	data: any;

	constructor(private fb: FormBuilder, public userDetailsService: UserDetailsService) {
		this.initialiseForm();
		this.userDetailsService.getUserDetails().subscribe((data) => {
			console.log(data['userDetails']);
			this.data = data['userDetails'];
			this.form.patchValue({
				firstName: this.data.firstName,
				lastName: this.data.lastName,
				company: this.data.company,
				phone: this.data.phone,
				email: this.data.email,
			});
		});
	}

	async ngOnInit() {}

	submit() {
		console.log(this.form.value);
		this.userDetailsService.updateUserDetails(this.form.value);
	}

	initialiseForm() {
		this.form = this.fb.group({
			firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			company: [''],
			phone: ['', Validators.required],
			email: ['', Validators.required],
		});
	}
}
