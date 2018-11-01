import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.reducer';

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'routerReducer'
);
