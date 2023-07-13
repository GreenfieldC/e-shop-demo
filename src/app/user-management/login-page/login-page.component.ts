import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateProfile } from 'firebase/auth';
import { CollectionReference, doc, setDoc } from 'firebase/firestore';
import { ShoppingBasketService } from 'src/app/shared/services/shopping-basket.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';

import { OrderHistoryService } from 'src/app/shared/services/order-history.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AddressesService } from 'src/app/shared/services/addresses.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
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
		public cartService: ShoppingBasketService,
		public orderService: OrderHistoryService,
		private toast: HotToastService,
		public favouritesService: FavouritesService,
		private addressService: AddressesService,
		public userDetailsService: UserDetailsService
	) {}

	ngOnInit() {
		this.initialiseForm();
	}

	/**
	 * Initialise the login form
	 */
	initialiseForm() {
		this.form = this.fb.group({
			username: ['', [Validators.minLength(3), Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.minLength(6), Validators.required]],
			passwordConfirm: ['', [Validators.minLength(3), Validators.required]],
		});
	}

	/**
	 * Set the type of form on click
	 * @param val string of the type of form
	 */
	changeType(val: any) {
		this.type = val;
	}

	/**
	 * get form state (either it is in state signup, login or password reset)
	 */
	get isLogin() {
		return this.type === 'login';
	}

	get isSignup() {
		return this.type === 'signup';
	}

	get isPasswordReset() {
		return this.type === 'reset';
	}

	/**
	 * get values from form controls
	 */
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

	/**
	 * check for password match
	 * */
	get passwordDoesMatch() {
		if (this.type !== 'signup') {
			return true;
		} else {
			return this.password!.value === this.passwordConfirm!.value;
		}
	}

	/**
	 * function that gets executed on form submit
	 */
	async onSubmit() {
		this.loading = true;

		const email = this.email!.value;
		const password = this.password!.value;
		const username = this.username!.value;

		try {
			//functionality that gets triggered when type == login
			if (this.isLogin) {
				await this.afAuth.signInWithEmailAndPassword(email, password);
				this.loginSuccess.emit();
				const user = await this.afAuth.currentUser;
				if (user) {
					this.login(user);
				}
			}

			//functionality that gets triggered when type == signup
			if (this.isSignup) {
				const credential = await this.afAuth.createUserWithEmailAndPassword(
					email,
					password
				);
				const user = credential.user;
				if (user) {
					await this.signup(user, username);
					await this.afAuth.signInWithEmailAndPassword(email, password); // Automatically log in the user after signup
					this.loginSuccess.emit();
					const loggedInUser = await this.afAuth.currentUser;
					if (loggedInUser) {
						this.login(loggedInUser);
					}
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

	//login functionality
	login(user: any) {
		//set currently logged in user in all services
		const services = [
			this.cartService,
			this.orderService,
			this.favouritesService,
			this.addressService,
		];
		services.forEach((service) => {
			service.currentlyLoggedInUser = user.displayName;
		});

		const authData = {
			id: user.uid,
			name: user.displayName,
		};

		localStorage.setItem('authToken', JSON.stringify(authData));

		this.setReferences(user);
		this.getData();

		// Show success message and change the form type to login
		this.toast.success('Logged in!');
	}

	//set document references
	setReferences(user: any) {
		this.cartService.cartReference = `user_${user.uid}/cart`;
		this.orderService.orderReference = `user_${user.uid}/orders`;
		this.favouritesService.favReference = `user_${user.uid}/favourites`;
		this.favouritesService.favListReference = `user_${user.uid}/favouritesList`;
		this.addressService.adressReference = `user_${user.uid}/addresses`;
		this.userDetailsService.dataReference = `user_${user.uid}/userDetails`;
	}

	//get corresponding data from firebase
	getData() {
		this.cartService.getUserData();
		this.orderService.getOrders();
		this.addressService.getAdresses();
		this.favouritesService.getFavs();
		this.userDetailsService.getUserData();
	}

	//signup functionality
	signup(user: any, username: any) {
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
			favourites: [],
		});
		setDoc(doc(this.firestore, `user_${user.uid}`, 'favouritesList'), {
			favouritesList: [],
		});
		setDoc(doc(this.firestore, `user_${user.uid}`, 'userDetails'), {
			userDetails: {
				firstName: null,
				lastName: null,
				company: null,
				phone: null,
				email: null,
				cards: [],
			},
		});

		updateProfile(user, { displayName: username });
	}
}
