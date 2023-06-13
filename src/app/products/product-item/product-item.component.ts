import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/selext-currency.service';

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
	@Input() product: any;

	selectedCurrency: string = 'USD';

	constructor(private currencyService: CurrencyService) {}
	ngOnInit(): void {
		this.currencyService.currency$.subscribe((currency) => {
			this.selectedCurrency = currency;
		});
	}

	//convert price to selected currency (USD, EUR, GBP)
	convertPrice(price: number): number {
		if (this.selectedCurrency === 'USD') {
			return price;
		} else if (this.selectedCurrency === 'EUR') {
			return price * 0.85;
		} else if (this.selectedCurrency === 'GBP') {
			return price * 0.73;
		} else {
			return price;
		}
	}
}
