import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './order-management/shopping-cart/shopping-cart.component';
import { SearchBarComponent } from './products/search-bar/search-bar.component';
import { LoginPageComponent } from './user-management/login-page/login-page.component';
import { OrdersListComponent } from './order-management/orders-list/orders-list.component';
import { SettingsComponent } from './user-management/settings/settings.component';
import { AddressesComponent } from './user-management/settings/addresses/addresses.component';
import { AccountComponent } from './user-management/settings/account/account.component';
import { authGuard } from './guards/auth.guard';
import { FavouritesComponent } from './user-management/favourites/favourites.component';
import { PaymentComponent } from './user-management/settings/payment/payment.component';
import { ReviewsComponent } from './products/reviews/reviews.component';

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
		path: 'reviews',
		component: ReviewsComponent,
	},
	{
		path: 'search',
		component: SearchBarComponent,
	},
	{
		path: 'orders',
		component: OrdersListComponent,
	},
	{
		path: 'settings',
		component: SettingsComponent,
		canActivate: [authGuard],
		children: [
			{ path: 'account', component: AccountComponent },
			{ path: 'addresses', component: AddressesComponent },
			{ path: 'payment', component: PaymentComponent },
		],
	},
	{ path: 'favourites', component: FavouritesComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
