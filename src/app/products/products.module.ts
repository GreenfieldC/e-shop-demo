import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
	declarations: [
		ProductItemComponent,
		ProductListComponent,
		ProductDetailsComponent,
	],
	imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
