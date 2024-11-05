import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    return true; // Allow navigation if token exists
  } else {
    // Redirect to login if not authenticated
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
