import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/user-management/login-page/login-page.component';
import { CurrencyService } from '../services/selext-currency.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ShoppingBasketService } from '../services/shopping-basket.service';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	selectedCurrency: string = 'EUR';
	clickCounter: number = 0;
	shoppingCartOpen: boolean = false;
	showLogOutButton: boolean = false;

	constructor(
		public dialog: MatDialog,
		private currencyService: CurrencyService,
		public afAuth: AngularFireAuth,
		public shoppingBasketService: ShoppingBasketService
	) {}

	onCurrencySelected(currency: string): void {
		this.currencyService.setCurrency(currency);
		this.selectedCurrency = currency;
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
