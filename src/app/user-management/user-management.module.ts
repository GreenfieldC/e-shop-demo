import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninDirective } from './google-signin.directive';

@NgModule({
	declarations: [LoginPageComponent, GoogleSigninDirective],
	imports: [
		CommonModule,
		UserManagementRoutingModule,
		SharedModule,
		ReactiveFormsModule,
	],
})
export class UserManagementModule {}
