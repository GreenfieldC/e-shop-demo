import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import {
	CollectionReference,
	collection,
	doc,
	setDoc,
} from 'firebase/firestore';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

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

	collection: CollectionReference;

	constructor(
		public afAuth: AngularFireAuth,
		private fb: FormBuilder,
		private firestore: Firestore,
		private router: Router,
		public userService: UserServiceService
	) {}

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
				const user = await this.afAuth.currentUser;
				if (user) {
					this.userService.currentlyLoggedIn = user.uid;
					this.router.navigateByUrl('');

					// later user data will be stored in local storage or cache and checked for existence on application init

					// const authData = { id: user.uid, name: user.displayName };
					// localStorage.setItem('authToken', JSON.stringify(authData));
				}
			}
			if (this.isSignup) {
				const credential =
					await this.afAuth.createUserWithEmailAndPassword(
						email,
						password
					);

				const user = credential.user;
				if (user) {
					setDoc(doc(this.firestore, `user_${user.uid}`, 'cart'), {
						products: [],
					});
				}
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
