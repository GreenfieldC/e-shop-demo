import { Component } from '@angular/core';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
	constructor(public orderService: OrderHistoryService) {}
}
