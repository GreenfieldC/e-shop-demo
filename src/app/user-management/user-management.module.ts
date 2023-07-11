import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninDirective } from './google-signin.directive';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './settings/account/account.component';
import { AddressesComponent } from './settings/addresses/addresses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FavouritesComponent } from './favourites/favourites.component';
import { PaymentComponent } from './settings/payment/payment.component';
import { DialogNewCardComponent } from './settings/dialog-new-card/dialog-new-card.component';

@NgModule({
	declarations: [
		LoginPageComponent,
		GoogleSigninDirective,
		SettingsComponent,
		AccountComponent,
		AddressesComponent,
		FavouritesComponent,
  PaymentComponent,
  DialogNewCardComponent,
	],
	imports: [
		CommonModule,
		UserManagementRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		MatExpansionModule,
	],
})
export class UserManagementModule {}
