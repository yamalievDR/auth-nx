import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state';
import {
  AUTH_FEATURE_KEY,
  authReducer,
  initialState as authInitialState
} from './+state/auth.reducer';
import { LoginComponent } from './login/login.component';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log(localStorageSync({ keys: [AUTH_FEATURE_KEY] })(reducer));
  return localStorageSync({ keys: [AUTH_FEATURE_KEY] })(reducer);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, {
      initialState: authInitialState,
      metaReducers: [localStorageSyncReducer]
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthService, AuthGuardService],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}
