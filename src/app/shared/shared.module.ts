/* hier kommt alles rein, was auch woanders gebraucht wird.
muss in jedes modul importiert werden */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Material Design */
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FrameComponent } from './frame/frame.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatDialogModule } from '@angular/material/dialog';

const components = [FrameComponent, SearchBarComponent];
const modules = [
	CommonModule,
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	LayoutModule,
	MatSidenavModule,
	MatListModule,
	MatMenuModule,
	RouterModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatSnackBarModule,
	MatDialogModule,
];

@NgModule({
	declarations: [...components],
	imports: [...modules],
	exports: [...modules, ...components],
})
export class SharedModule {}
