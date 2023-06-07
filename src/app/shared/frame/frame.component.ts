import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	selectedCurrency: string = 'EUR';
	clickCounter: number = 0;

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
}
