import { Component } from '@angular/core';

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
	dropDownOpen: boolean = false;
	selectedCurrency: string = 'EUR';
}
