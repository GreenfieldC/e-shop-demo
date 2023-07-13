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
		const isMobileView = window.innerWidth < 400;
		const dialogConfig = {
			width: isMobileView ? '100vw' : '400px',
			maxWidth: '400px',
		};
		this.dialog.open(DialogNewCardComponent, dialogConfig);
	}

	setDefault(index: number) {
		this.userDetailsService.data.cards.forEach((card: any) => {
			card.isDefault = false;
		});

		this.userDetailsService.data.cards[index].isDefault = true;

		this.userDetailsService.updateUserDetails();
	}
}
