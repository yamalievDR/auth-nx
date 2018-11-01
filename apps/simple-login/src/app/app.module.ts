import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AuthGuardService, AuthModule } from '@auth-nx/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { AppEffects } from './+state/app.effects';
import { appReducer, initialState as appInitialState } from './+state/app.reducer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule as CustomRouterModule } from '@auth-nx/router';

const router: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(router, { initialNavigation: 'enabled' }),
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: { app: appInitialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
    AuthModule,
    CustomRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
