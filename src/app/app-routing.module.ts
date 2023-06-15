import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './order-management/shopping-cart/shopping-cart.component';
import { SearchBarComponent } from './products/search-bar/search-bar.component';
import { LoginPageComponent } from './user-management/login-page/login-page.component';

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
