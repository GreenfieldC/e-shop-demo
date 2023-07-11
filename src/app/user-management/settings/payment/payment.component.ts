import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewCardComponent } from '../dialog-new-card/dialog-new-card.component';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
	constructor(
		private dialog: MatDialog,
		public userDetailsService: UserDetailsService
	) {}

	openDialog() {
		this.dialog.open(DialogNewCardComponent);
	}
}
