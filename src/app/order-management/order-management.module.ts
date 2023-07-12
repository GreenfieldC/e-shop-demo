import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SharedModule } from '../shared/shared.module';
import { DialogPaymentComponent } from './dialog-payment/dialog-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DailogOrderDetailsComponent } from './dailog-order-details/dailog-order-details.component';

@NgModule({
	declarations: [ShoppingCartComponent, OrdersListComponent, DialogPaymentComponent, DailogOrderDetailsComponent],
	imports: [
		CommonModule,
		SharedModule,
		ReactiveFormsModule,
		OrderManagementRoutingModule,
	],
})
export class OrderManagementModule {}
