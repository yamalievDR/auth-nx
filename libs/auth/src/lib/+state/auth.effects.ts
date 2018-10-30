import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LogoutComplete,
  LogoutConfirmed
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((auth: Login) => auth.payload),
    switchMap(payload =>
      this.authService.login(payload).pipe(
        map(user => new LoginSuccess({ user })),
        catchError(e => of(new LoginFailure(e)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/home']))
  );

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    switchMap(() => this.authService.logout().pipe(map(confirmed => new LogoutConfirmed())))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutConfirmed),
    tap(() => this.router.navigate(['/login'])),
    map(() => new LogoutComplete())
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
