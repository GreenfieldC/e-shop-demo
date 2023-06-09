import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
	form!: FormGroup;

	type: 'login' | 'signup' | 'reset' = 'signup';
	loading = false;
	serverMessage: any;

	constructor(private fb: FormBuilder, public afAuth: AngularFireAuth) {}

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.minLength(6), Validators.required]],
			passwordConfirm: ['', []],
		});
	}

	changeType(val: 'login' | 'signup' | 'reset') {
		this.type = val;
	}

	get isLogin() {
		return this.type === 'login';
	}

	get isSignup() {
		return this.type === 'signup';
	}

	get isPasswordReset() {
		return this.type === 'reset';
	}

	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	get passwordConfirm() {
		return this.form.get('passwordConfirm');
	}

	get passwordDoesMatch() {
		if (this.type !== 'signup') {
			return true;
		} else {
			return this.password?.value === this.passwordConfirm?.value;
		}
	}

	async onSubmit() {}
}
