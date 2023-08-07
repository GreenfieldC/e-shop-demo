import { Component } from '@angular/core';
import { ProductReviewService } from 'src/app/shared/services/product-review.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	filteredReviews: Array<any>;

	constructor(public reviewService: ProductReviewService) {}

	ngOnInit() {}
}
