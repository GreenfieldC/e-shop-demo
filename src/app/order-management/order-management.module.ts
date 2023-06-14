import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ShoppingCartComponent, OrdersListComponent],
	imports: [CommonModule, OrderManagementRoutingModule, SharedModule],
})
export class OrderManagementModule {}
