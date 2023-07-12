import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dailog-order-details',
	templateUrl: './dailog-order-details.component.html',
	styleUrls: ['./dailog-order-details.component.scss'],
})
export class DailogOrderDetailsComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		console.log(this.data);
	}
}
