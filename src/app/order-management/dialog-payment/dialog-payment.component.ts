import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TitleCasePipe } from '@angular/common';

@Component({
	selector: 'app-dialog-payment',
	templateUrl: './dialog-payment.component.html',
	styleUrls: ['./dialog-payment.component.scss'],
})
export class DialogPaymentComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
