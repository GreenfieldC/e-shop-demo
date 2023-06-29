import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authGuard: CanActivateFn = async () => {
	const authService = inject(AngularFireAuth);
	const router = inject(Router);
	if (await authService.currentUser) {
		return true;
	}
	return router.parseUrl('/');
};
