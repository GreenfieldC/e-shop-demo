import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
	declarations: [LoginPageComponent],
	imports: [CommonModule, SharedModule, UserManagementRoutingModule],
})
export class UserManagementModule {}
