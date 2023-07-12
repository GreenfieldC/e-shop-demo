import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
	selected: string = 'ACCOUNT SETTINGS';
	form: FormGroup;
	data: any;

	constructor(
		private fb: FormBuilder,
		public userDetailsService: UserDetailsService,
		public toast: HotToastService
	) {}

	ngOnInit() {
		this.initialiseForm();
		this.fillForm();
	}

	submit() {
		this.userDetailsService.data = this.form.value;
		// console.log(this.userDetailsService.data);
		this.userDetailsService.updateUserDetails();
		this.toast.success('Data updated!');
	}

	initialiseForm() {
		this.form = this.fb.group({
			firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+\s*$/)]],
			company: [''],
			phone: ['', Validators.required],
			email: ['', Validators.required],
			cards: new FormControl(this.userDetailsService.data.cards),
		});
	}

	fillForm() {
		const data = this.userDetailsService.data;
		this.form.patchValue({
			firstName: data.firstName,
			lastName: data.lastName,
			company: data.company,
			phone: data.phone,
			email: data.email,
		});
	}
}
