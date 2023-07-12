import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { DailogOrderDetailsComponent } from '../dailog-order-details/dailog-order-details.component';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
	constructor(public orderService: OrderHistoryService, private dialog: MatDialog) {
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

	openDialog(order: any) {
		this.dialog.open(DailogOrderDetailsComponent, {
			data: order,
		});
	}
}
