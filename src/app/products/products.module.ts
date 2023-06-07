import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
	declarations: [ProductItemComponent, ProductListComponent],
	imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
