import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

/**
 * interface for the Credit Card Details entered by the user
 */
interface cardDetails {
	number: null | number;
	expiry: null | string;
	cvv: null | number;
	name: null | string;
	isDefault: null | boolean;
}

@Component({
	selector: 'app-dialog-new-card',
	templateUrl: './dialog-new-card.component.html',
	styleUrls: ['./dialog-new-card.component.scss'],
})
export class DialogNewCardComponent implements OnInit {
	form: FormGroup;
	cardDetails: cardDetails = {
		number: null,
		expiry: null,
		cvv: null,
		name: null,
		isDefault: null,
	};

	constructor(
		private fb: FormBuilder,
		private dialog: MatDialog,
		private userDetailsService: UserDetailsService,
		private toast: HotToastService
	) {}

	ngOnInit() {
		this.initialiseForm();
	}

	/**
	 * 	initialisation of the card infirmation forms
	 */
	initialiseForm() {
		this.form = this.fb.group({
			cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}\s*$/)]],
			expiry: [
				'',
				[Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}\s*$/)],
			],
			cvv: ['', [Validators.required, Validators.pattern(/^\d{3}\s*$/)]],
			name: [
				'',
				[Validators.required, Validators.pattern(/^[A-Za-z]+\s+[A-Za-z]+\s*$/)],
			],
		});
	}

	/**
	 * getting credit Card details from form
	 */
	get cardNumber() {
		return this.form.get('cardNumber');
	}
	get expiry() {
		return this.form.get('expiry');
	}
	get cvv() {
		return this.form.get('cvv');
	}
	get name() {
		return this.form.get('name');
	}

	onNoClick() {
		this.dialog.closeAll();
	}

	/**
	 * setCreditData()
	 */
	setCreditData() {
		this.cardDetails = {
			number: this.cardNumber!.value,
			expiry: this.expiry!.value,
			cvv: this.cvv!.value,
			name: this.name!.value,
			isDefault: true,
		};
	}

	addCard() {
		if (this.form.valid) {
			this.userDetailsService.data.cards.forEach((card: any) => {
				card.isDefault = false;
			});

			this.setCreditData();
			this.userDetailsService.data.cards.push(this.cardDetails);
			this.userDetailsService.updateUserDetails();
			this.dialog.closeAll();
		} else {
			this.toast.error('Complete Form with valid data!');
		}
	}
}
