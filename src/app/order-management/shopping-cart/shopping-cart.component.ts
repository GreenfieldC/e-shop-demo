import { Component } from '@angular/core';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
	discountCode: number;
	panelOpenState: boolean = false;
	discountGiven: boolean = false;
	discount: number = 0;

	constructor(
		public shoppingCartService: ShoppingBasketService,
		public exchangeRateService: ExchangeRateService
	) {}

	incrementQuantity(i: number, event: Event) {
		event.stopPropagation();
		this.shoppingCartService.products[i].quantity += 1;
		this.shoppingCartService.updateProducts();
	}

	decreaseQuantity(i: number, event: Event) {
		event.stopPropagation();

		if (this.shoppingCartService.products[i].quantity === 1) {
			this.shoppingCartService.products.splice(i, 1);
		} else {
			this.shoppingCartService.products[i].quantity -= 1;
		}

		this.shoppingCartService.updateProducts();
	}

	validateDiscount() {
		this.shoppingCartService.couponCodes.forEach((coupon) => {
			if (coupon.code == this.discountCode) {
				this.discountGiven = true;
				this.discount = coupon.discount;
			} else {
				this.discountGiven = false;
				this.discount = 0;
			}
		});
	}
}
