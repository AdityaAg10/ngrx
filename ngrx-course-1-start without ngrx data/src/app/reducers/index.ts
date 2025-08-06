import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';

export interface AppState {
    
}

export const reducers: ActionReducerMap<AppState> = {
    // corresponds to the statekey in the StoreRouterConnectingModule in the app module
    router: routerReducer
};

export function logger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);

        return reducer(state, action);
    }

}

// metaReducers gets invoked before other reducers do
export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];


