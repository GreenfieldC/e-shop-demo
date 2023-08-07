import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { DailogOrderDetailsComponent } from '../dailog-order-details/dailog-order-details.component';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { DialogProductDetailsComponent } from 'src/app/products/dialog-product-details/dialog-product-details.component';
import { HotToastService } from '@ngneat/hot-toast';
import { DialogProblemComponent } from '../dialog-problem/dialog-problem.component';
import { DialogProductReviewComponent } from '../dialog-product-review/dialog-product-review.component';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
	constructor(
		public orderService: OrderHistoryService,
		private dialog: MatDialog,
		public cartService: ShoppingBasketService,
		private toast: HotToastService
	) {
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

	openSummaryDialog(order: any) {
		this.dialog.open(DailogOrderDetailsComponent, {
			data: order,
		});
	}

	openProductDialog(product: any) {
		const isMobileView = window.innerWidth < 800;
		const dialogConfig = {
			data: product,
			maxHeight: isMobileView ? '100dvh' : '650px',
			maxWidth: isMobileView ? '480px' : '800px',
			height: isMobileView ? '100dvh' : 'fit-content',
			width: '100%',
			panelClass: isMobileView ? 'full-screen-modal' : undefined,
		};

		this.dialog.open(DialogProductDetailsComponent, dialogConfig);
	}

	openProblemDialog() {
		this.dialog.open(DialogProblemComponent);
	}

	openProductReview(product: any) {
		this.dialog.open(DialogProductReviewComponent, {
			height: 'fit-content',
			width: '600px',
			data: product,
		});
	}
}
