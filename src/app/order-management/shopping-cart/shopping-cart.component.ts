import { Component } from '@angular/core';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
	constructor(public shoppingCartService: ShoppingBasketService) {}

	panelOpenState: boolean = false;
}
