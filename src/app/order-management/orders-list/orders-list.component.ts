import { Component, HostListener } from '@angular/core';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
	constructor(public orderService: OrderHistoryService) {
		this.checkMobile();
	}

	mobile: boolean = true;
	panelOpenState: boolean = false;

	@HostListener('window:resize', ['$event'])
	onResize(event: MouseEvent) {
		if (window.innerWidth < 900) {
			this.mobile = true;
		} else {
			this.mobile = false;
		}
	}

	private checkMobile() {
		window.innerWidth < 900 ? (this.mobile = true) : (this.mobile = false);
	}
}
