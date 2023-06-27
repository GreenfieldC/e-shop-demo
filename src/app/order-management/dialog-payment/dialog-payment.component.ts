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

	getCardDetailsArray(details: any): any[] {
		return Object.entries(details);
	}

	placeOrder() {
		const order = {
			paymentDetails: this.data,
			products: this.cartService.products,
		};

		this.orderService.orders.push(order);
		this.orderService.updateOrders();
		this.dialog.closeAll();
	}
}
