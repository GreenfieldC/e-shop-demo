import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductReviewService } from 'src/app/shared/services/product-review.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	filteredReviews: Array<any>;
	id: number;

	constructor(
		public reviewService: ProductReviewService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			// Convert this.id to a number
			this.id = parseInt(params['id'], 10); // Use parseInt with base 10

			// Filter reviews inside the subscription block using the converted numericId
			this.filteredReviews = this.reviewService.reviews.filter(
				(review: any) => review.productId === this.id
			);
		});
	}
}
