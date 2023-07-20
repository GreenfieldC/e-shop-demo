import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleSigninDirective } from './google-signin.directive';

describe('GoogleSigninDirective', () => {
	let directive: GoogleSigninDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AngularFireAuth], // Provide the necessary dependency
		});
		const afAuth = TestBed.inject(AngularFireAuth); // Inject AngularFireAuth
		directive = new GoogleSigninDirective(afAuth); // Pass the injected dependency
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
});
