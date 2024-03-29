/* hier kommt alles rein, was auch woanders gebraucht wird.
muss in jedes modul importiert werden */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* Material Design */
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerComponent } from './spinner/spinner.component';
import { UpScrollBtnComponent } from './up-scroll-btn/up-scroll-btn.component';

const components = [
	FrameComponent,
	FirstNamePipe,
	SpinnerComponent,
	UpScrollBtnComponent,
];
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
	MatExpansionModule,
	FormsModule,
	MatCheckboxModule,
	MatSelectModule,
	MatRadioModule,
	MatProgressSpinnerModule,
	MatTooltipModule,
];

@NgModule({
	declarations: [...components],
	imports: [...modules],
	exports: [...modules, ...components],
})
export class SharedModule {}
