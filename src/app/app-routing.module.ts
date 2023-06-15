import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { LoginPageComponent } from './user-management/login-page/login-page.component';
import { ShoppingCartComponent } from './order-management/shopping-cart/shopping-cart.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./products/products.module').then((m) => m.ProductsModule), // Lazy load module
	},
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'shopping-cart',
		component: ShoppingCartComponent,
	},
	{
		path: 'search',
		component: SearchBarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
