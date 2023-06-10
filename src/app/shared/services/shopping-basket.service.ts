import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ShoppingBasketService {
	items: Array<any> = [];
	totalPrice: number = 0;
}
