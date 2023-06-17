import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
	@Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

	form!: FormGroup;

	type: 'login' | 'signup' | 'reset' = 'signup';
	loading = false;

	serverMessage: any;

	constructor(public afAuth: AngularFireAuth, private fb: FormBuilder) {}

	ngOnInit() {
		this.initialiseForm();
	}

	/**
	 * Initialise the form
	 */
	initialiseForm() {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.minLength(6), Validators.required]],
			passwordConfirm: ['', []],
		});
	}

	/**
	 * Set the type of form
	 * @param val string of the type of form
	 */
	changeType(val: any) {
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
			return this.password!.value === this.passwordConfirm!.value;
		}
	}

	async onSubmit() {
		this.loading = true;

		const email = this.email!.value;
		const password = this.password!.value;

		try {
			if (this.isLogin) {
				await this.afAuth.signInWithEmailAndPassword(email, password);
				this.loginSuccess.emit();
			}
			if (this.isSignup) {
				await this.afAuth.createUserWithEmailAndPassword(
					email,
					password
				);
			}
			if (this.isPasswordReset) {
				await this.afAuth.sendPasswordResetEmail(email);
				this.serverMessage = 'Check your email';
			}
		} catch (err) {
			this.serverMessage = err;
		}

		this.loading = false;
	}

	logout() {
		this.afAuth.signOut();
	}
}
