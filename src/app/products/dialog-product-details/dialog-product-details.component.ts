import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-product-details',
	templateUrl: './dialog-product-details.component.html',
	styleUrls: ['./dialog-product-details.component.scss'],
})
export class DialogProductDetailsComponent {
	constructor(
		private dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		console.log(this.data);
	}

	onNoClick() {
		this.dialog.closeAll();
	}
}
