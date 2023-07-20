import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard'; // Corrected import statement

describe('AuthGuard', () => {
	let guard: any; // You can also replace 'any' with the appropriate type if known

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = authGuard;
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
