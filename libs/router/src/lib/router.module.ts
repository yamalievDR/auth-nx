import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../apps/simple-login/src/environments/environment';
import { CustomSerializer, reducers } from './+state';
import { RouterStateSerializer } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
// import {
//   ROUTER_FEATURE_KEY,
//   initialState as routerInitialState,
//   routerReducer
// } from './+state/router.reducer';
import { RouterEffects } from './+state/router.effects';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('routerReducer', reducers, { metaReducers }),
    EffectsModule.forFeature([RouterEffects])
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  exports: [StoreModule, EffectsModule]
})
export class RouterModule {}
