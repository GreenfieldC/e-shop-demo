import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TitleCasePipe } from '@angular/common';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';

@Component({
	selector: 'app-dialog-payment',
	templateUrl: './dialog-payment.component.html',
	styleUrls: ['./dialog-payment.component.scss'],
})
export class DialogPaymentComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public orderService: OrderHistoryService,
		public dialog: MatDialog,
		public cartService: ShoppingBasketService
	) {}

	orderAnimation: boolean = false;

	getCardDetailsArray(details: any): any[] {
		return Object.entries(details);
	}

	generateOrderNumber(): string {
		const randomNumber1 = Math.floor(Math.random() * 900) + 100;
		const randomNumber2 =
			Math.floor(Math.random() * 9000000) + 1000000;
		const randomNumber3 =
			Math.floor(Math.random() * 9000000) + 1000000;
		const orderNumber = `ORDER # ${randomNumber1}-${randomNumber2}-${randomNumber3}`;
		return orderNumber;
	}

	placeOrder() {
		this.orderAnimation = true;

		const order = {
			orderID: this.generateOrderNumber(),
			paymentDetails: this.data,
			products: this.cartService.products,
			date: new Date(),
		};

		setTimeout(() => {
			this.orderService.orders.push(order);
			this.orderService.updateOrders();

			this.cartService.products = [];
			this.cartService.updateProducts();

			this.dialog.closeAll();
		}, 2000);

		this.orderAnimation = false;
	}
}
