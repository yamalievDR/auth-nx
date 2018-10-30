import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import * as fromStore from './+state/auth.reducer';
import { authQuery } from './+state/';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.AuthState>,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStoreAuthentication().pipe(
      map(storeAuth => {
        if (storeAuth) {
          return of(true);
        }
      }),
      map(storeOrApiAuth => {
        console.log(storeOrApiAuth);
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  checkStoreAuthentication(): Observable<boolean> {
    return this.store.pipe(
      select(authQuery.getUser),
      map(user => !!user),
      take(1)
    );
  }
}
