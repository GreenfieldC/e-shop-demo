import { Component, Input, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
	@Input() product: any;
	selected: boolean = false;

	constructor(public exchangeRateService: ExchangeRateService) {}

	toggleSelected() {
		this.selected = !this.selected;
	}
}
