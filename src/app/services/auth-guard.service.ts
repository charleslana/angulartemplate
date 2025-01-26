import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authToken = sessionStorage.getItem('auth-token');

  if (authToken) {
    return true;
  } else {
    router.navigate(['']).then(r => null);
    return false;
  }
};
