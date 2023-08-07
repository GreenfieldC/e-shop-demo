import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DialogProductDetailsComponent } from './dialog-product-details/dialog-product-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
	declarations: [
		ProductItemComponent,
		ProductListComponent,
		DialogProductDetailsComponent,
		SearchBarComponent,
  ReviewsComponent,
	],
	imports: [CommonModule, SharedModule, ProductsRoutingModule, MatButtonToggleModule],
})
export class ProductsModule {}
