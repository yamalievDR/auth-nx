import { UserModel } from '../models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and
 *  - authReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AuthState {
  user: UserModel | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  user: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return { ...state, user: action.payload.user };

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}
