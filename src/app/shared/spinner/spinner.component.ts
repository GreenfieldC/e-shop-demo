import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	constructor(public apiService: ApiService) {}
}
