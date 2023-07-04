import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TitleCasePipe } from '@angular/common';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { Router } from '@angular/router';
import { AddressesService } from 'src/app/shared/services/addresses.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
	selector: 'app-dialog-payment',
	templateUrl: './dialog-payment.component.html',
	styleUrls: ['./dialog-payment.component.scss'],
})
export class DialogPaymentComponent {
	orderAnimation: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public orderService: OrderHistoryService,
		public dialog: MatDialog,
		public cartService: ShoppingBasketService,
		private router: Router,
		public aS: AddressesService,
		private toast: HotToastService
	) {}

	getCardDetailsArray(details: any): any[] {
		return Object.entries(details);
	}

	generateOrderNumber(): string {
		const randomNumber1 = Math.floor(Math.random() * 900) + 100;
		const randomNumber2 = Math.floor(Math.random() * 9000000) + 1000000;
		const randomNumber3 = Math.floor(Math.random() * 9000000) + 1000000;
		const orderNumber = `ORDER # ${randomNumber1}-${randomNumber2}-${randomNumber3}`;
		return orderNumber;
	}

	removeDiscount() {
		for (let i = 0; i < this.cartService.couponCodes.length; i++) {
			const coupon = this.cartService.couponCodes[i].code;

			if (coupon.toString() == this.data.discountCode) {
				this.cartService.couponCodes.splice(i, 1);
				this.cartService.updateCodes();
			}
		}
	}

	placeOrder() {
		this.orderAnimation = true;
		const order = {
			orderID: this.generateOrderNumber(),
			paymentDetails: this.data,
			products: this.cartService.products,
			date: new Date(),
			returnDate: this.returnDate,
		};

		setTimeout(() => {
			this.orderService.orders.push(order);
			this.orderService.updateOrders();
			this.cartService.products = [];
			this.cartService.updateProducts();
			this.orderAnimation = false;
			this.removeDiscount();
			this.toast.success('Order successful!');
			this.router.navigateByUrl('orders');
			this.dialog.closeAll();
		}, 2000);
	}

	get returnDate(): Date {
		const date = new Date();
		date.setDate(date.getDate() + 14);
		return date;
	}
}
