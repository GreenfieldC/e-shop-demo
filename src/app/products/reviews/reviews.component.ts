import { Component } from '@angular/core';
import { ProductReviewService } from 'src/app/shared/services/product-review.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	constructor(public reviewService: ProductReviewService) {}
}
