import { UserModel } from '../models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: UserModel | null;
  error?: any;
  isLoading?: boolean;
}

export const initialState: AuthState = {
  user: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: null
      };

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}
