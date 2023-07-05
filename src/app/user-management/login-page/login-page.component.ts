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
	updateDoc,
} from 'firebase/firestore';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';

import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { HotToastService } from '@ngneat/hot-toast';
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

	favouriteProducts: any[] = [];

	constructor(
		public afAuth: AngularFireAuth,
		private fb: FormBuilder,
		private firestore: Firestore,
		private router: Router,
		public cartService: ShoppingBasketService,
		public orderService: OrderHistoryService,
		private toast: HotToastService,
		public favouritesService: FavouritesService
	) {}

	ngOnInit() {
		this.initialiseForm();
		this.generateProductslistForFavorites();
	}

	/**
	 * Initialise the form
	 */
	initialiseForm() {
		this.form = this.fb.group({
			username: ['', []],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.minLength(6), Validators.required]],
			passwordConfirm: ['', [Validators.minLength(3), Validators.required]],
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

	get username() {
		return this.form.get('username');
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
		const username = this.username!.value;

		try {
			if (this.isLogin) {
				await this.afAuth.signInWithEmailAndPassword(email, password);
				this.loginSuccess.emit();
				const user = await this.afAuth.currentUser;
				if (user) {
					this.cartService.currentlyLoggedInUser = user.displayName;
					this.orderService.currentlyLoggedInUser = user.displayName;

					const authData = {
						id: user.uid,
						name: user.displayName,
					};
					localStorage.setItem('authToken', JSON.stringify(authData));

					this.cartService.cartReference = `user_${user.uid}/cart`;
					this.orderService.orderReference = `user_${user.uid}/orders`;
					this.favouritesService.favouritesReference = `user_${user.uid}/favourites`;

					this.cartService.getUserData();
					this.orderService.getOrders();
					// Show success message and change the form type to login
					this.toast.success('Logged in!');
				}
			}
			if (this.isSignup) {
				const credential = await this.afAuth.createUserWithEmailAndPassword(
					email,
					password
				);

				const user = credential.user;
				if (user) {
					setDoc(doc(this.firestore, `user_${user.uid}`, 'cart'), {
						products: [],
					});
					setDoc(doc(this.firestore, `user_${user.uid}`, 'orders'), {
						orders: [],
					});
					setDoc(doc(this.firestore, `user_${user.uid}`, 'addresses'), {
						addresses: [],
					});
					setDoc(doc(this.firestore, `user_${user.uid}`, 'favourites'), {
						favourites: [this.favouriteProducts],
					});

					updateProfile(user, { displayName: username });

					this.type = 'login';
				}
			}
			if (this.isPasswordReset) {
				await this.afAuth.sendPasswordResetEmail(email);
				this.serverMessage = 'Check your email';
			}
		} catch (err) {
			this.serverMessage = err;
			this.toast.error('Failed to log in');
		}

		this.loading = false;
	}

	generateProductslistForFavorites() {
		this.favouriteProducts = Array.from({ length: 20 }, (_, index) => ({
			id: index + 1,
			favourite: false,
		}));
		console.log(this.favouriteProducts);
	}
}
