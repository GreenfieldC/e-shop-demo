import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/user-management/login-page/login-page.component';

import { ExchangeRateService } from '../services/exchange-rate.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ShoppingBasketService } from '../services/shopping-basket.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
			state('*', style({ opacity: 1, transform: 'translateY(0)' })),
			transition(':enter', [
				animate(
					'300ms ease-in-out',
					style({ opacity: 1, transform: 'translateY(0)' })
				),
			]),
			transition(':leave', [
				animate(
					'300ms ease-in-out',
					style({
						opacity: 0,
						transform: 'translateY(-20px)',
					})
				),
			]),
		]),
	],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	clickCounter: number = 0;
	shoppingCartOpen: boolean = false;
	showLogOutButton: boolean = false;
	iconBoxOpen: boolean = true;
	iconName: string = 'menu';

	constructor(
		public dialog: MatDialog,
		public exchangeRateService: ExchangeRateService,
		public afAuth: AngularFireAuth,
		public shoppingBasketService: ShoppingBasketService,
		private toast: HotToastService,
		private router: Router
	) {
		this.checkMobile();
	}

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

	@HostListener('window:resize', ['$event'])
	onResize(event: MouseEvent) {
		if (window.innerWidth > 480) {
			this.iconBoxOpen = true;
			this.iconName = 'menu';
		} else {
			this.iconBoxOpen = false;
		}
	}

	openLoginDialog() {
		if (this.shoppingBasketService.currentlyLoggedInUser != 'Guest') {
			// User is logged in, do not open the dialog
			this.toggleLogOutButton();
			return;
		} else {
			const dialogRef = this.dialog.open(LoginPageComponent);

			dialogRef.componentInstance.loginSuccess.subscribe(() => {
				dialogRef.close(); // Close the dialog when login is successful
			});
		}
	}

	async logout() {
		this.afAuth.signOut();
		this.showLogOutButton = false;
		this.toast.success('Logged out!');
		this.shoppingBasketService.currentlyLoggedInUser = 'Guest';
		localStorage.removeItem('authToken');
		setTimeout(() => {
			this.router.navigate(['/']);
		}, 2000);
	}

	toggleLogOutButton() {
		this.showLogOutButton = !this.showLogOutButton;
	}

	toggleBurgerMenu() {
		this.iconName === 'menu' ? (this.iconName = 'close') : (this.iconName = 'menu');
		this.iconBoxOpen = !this.iconBoxOpen;
	}

	private checkMobile() {
		window.innerWidth < 480 ? (this.iconBoxOpen = false) : null;
	}
}
