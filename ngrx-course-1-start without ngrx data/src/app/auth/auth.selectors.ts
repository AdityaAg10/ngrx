import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");


// createSelector   ->	    Derives data from state
export const isLoggedin = createSelector(
    // state => state["auth"], this entire thing was replaced by selectAuthState function
    selectAuthState,
    (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
    isLoggedin,
    loggedIn => !loggedIn
)