import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/user-management/login-page/login-page.component';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	selectedCurrency: string = 'EUR';
	clickCounter: number = 0;
	shoppingCartOpen: boolean = false;

	constructor(public dialog: MatDialog) {}

	@ViewChild('dropdown') el: any;
	// Close the dropdown menu when a user clicks outside of it
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		if (this.dropDownOpen) {
			// Check if the clicked element is outside the dropdown menu
			const clickedElement = event.target as HTMLElement;
			const dropdownMenu = this.el.nativeElement;

			if (
				dropdownMenu &&
				!dropdownMenu.contains(clickedElement) &&
				this.clickCounter === 0
			) {
				this.clickCounter++;
			} else if (
				dropdownMenu &&
				!dropdownMenu.contains(clickedElement) &&
				this.clickCounter > 0
			) {
				this.dropDownOpen = false;
				this.clickCounter = 0;
			}
		}
	}

	openLoginDialog(): void {
		const dialogRef = this.dialog.open(LoginPageComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}
}
