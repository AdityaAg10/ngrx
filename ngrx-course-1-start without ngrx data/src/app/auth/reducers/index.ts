import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User,
  halo: string
}

export const initialAuthState: AuthState = {
  user: undefined,
  halo: ""
}


// createReducer	  ->    Defines how state changes
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
      halo: "reducer check 1"
    }
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state, // Spread existing state to retain properties
      user: undefined
    };
  })

)


// function authReducer(state -> prev state, action -> some action like login or logout): 
// State -> new state calculated  { }
