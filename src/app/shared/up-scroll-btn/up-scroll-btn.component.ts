import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
	selector: 'app-up-scroll-btn',
	templateUrl: './up-scroll-btn.component.html',
	styleUrls: ['./up-scroll-btn.component.scss'],
})
export class UpScrollBtnComponent {
	windowScrolled: boolean;

	constructor(@Inject(DOCUMENT) private document: Document) {}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (
			window.scrollY ||
			document.documentElement.scrollTop ||
			document.body.scrollTop > 100
		) {
			this.windowScrolled = true;
		} else if (
			(this.windowScrolled && window.scrollY) ||
			document.documentElement.scrollTop ||
			document.body.scrollTop < 10
		) {
			this.windowScrolled = false;
		}
	}

	ngOnInit() {}
}
