import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";


export const login = createAction(
    // [Login Page] is the source of the action |  User Login -> telling the store that user has logged in
    "[Login Page] User Login", 
    props<{user: User}>()
)


export const logout = createAction(
    "[Top Menu] Logout"
)   
