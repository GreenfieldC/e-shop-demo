import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./products/products.module').then((m) => m.ProductsModule), // Lazy load module
	},
	{
		path: 'shopping-basket',
		component: ProductDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
