import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/user-management/login-page/login-page.component';

import { ExchangeRateService } from '../services/exchange-rate.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ShoppingBasketService } from '../services/shopping-basket.service';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	clickCounter: number = 0;
	shoppingCartOpen: boolean = false;
	showLogOutButton: boolean = false;

	constructor(
		public dialog: MatDialog,
		// private currencyService: CurrencyService,
		public exchangeRateService: ExchangeRateService,
		public afAuth: AngularFireAuth,
		public shoppingBasketService: ShoppingBasketService
	) {}

	ngOnInit() {
		this.exchangeRateService.getExchangeRates();
	}

	onCurrencySelected(currency: string): void {
		this.exchangeRateService.selectedCurrency = currency;
		let rate = this.exchangeRateService.exchangeRates[currency];
		this.exchangeRateService.selectedRate = rate;
		this.setCurrencyIcon(currency);
	}

	setCurrencyIcon(currency: string) {
		const currencyIcons: { [key: string]: string } = {
			USD: '\u0024',
			EUR: '\u20AC',
			GBP: '\u00A3',
		};

		this.exchangeRateService.icon = currencyIcons[currency];
	}

	@ViewChild('dropdown') el: any;
	// Close the dropdown menu when a user clicks outside of it
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		if (this.dropDownOpen) {
			// Check if the clicked element is outside the dropdown menu
			const clickedElement = event.target as HTMLElement;
			const dropdownMenu = this.el.nativeElement;

			if (
				dropdownMenu &&
				!dropdownMenu.contains(clickedElement) &&
				this.clickCounter === 0
			) {
				this.clickCounter++;
			} else if (
				dropdownMenu &&
				!dropdownMenu.contains(clickedElement) &&
				this.clickCounter > 0
			) {
				this.dropDownOpen = false;
				this.clickCounter = 0;
			}
		}
	}

	async openLoginDialog(): Promise<void> {
		const currentUser = await this.afAuth.currentUser;
		if (currentUser) {
			// User is logged in, do not open the dialog
			this.toggleLogOutButton();
			return;
		}
		const dialogRef = this.dialog.open(LoginPageComponent);

		dialogRef.componentInstance.loginSuccess.subscribe(() => {
			dialogRef.close(); // Close the dialog when login is successful
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	logout() {
		this.afAuth.signOut();
		this.showLogOutButton = false;
	}

	onLoginDialogClosed(): void {
		this.dialog.closeAll();
	}

	toggleLogOutButton() {
		this.showLogOutButton = !this.showLogOutButton;
	}
}
