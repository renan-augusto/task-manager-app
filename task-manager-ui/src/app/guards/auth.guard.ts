import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.validateToken().pipe(
    map(res => {
      if(res.statusCode === 202) {
        return true;
      } else if(res.statusCode === 401) {
        window.localStorage.clear();
        _router.navigate(['auth/login']);
        return false;
      } else {
        window.localStorage.clear();
        console.error('Unexpected status code: ', res.statusCode);
        _router.navigate(['auth/login']);
        return false;
      }
    }),
    catchError(err => {
      console.error('Invalid token or error ', err);
      window.localStorage.clear();
      _router.navigate(['auth/login']);
      return of(false)
    })
  )

};
