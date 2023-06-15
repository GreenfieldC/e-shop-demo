import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DialogProductDetailsComponent } from './dialog-product-details/dialog-product-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
	declarations: [
		ProductItemComponent,
		ProductListComponent,
		ProductDetailsComponent,
		DialogProductDetailsComponent,
		SearchBarComponent,
	],
	imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
