import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);
const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoading
);

export const authQuery = {
  getUser,
  getError,
  getLoading
};
