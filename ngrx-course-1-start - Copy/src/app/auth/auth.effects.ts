import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

// this class should only go to ngrx effects both in app module and auth module
@Injectable()
export class AuthEffects{

// M3 -> ngrx effects also provides error handling by default, dont even need to subscrive manually 
    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
            ),
        // this is impt as without it accidentally an infinite might have been created 
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user'),
                    this.router.navigateByUrl('/login')
                }),
                
        ),
            {dispatch: false}
    ) 



    constructor(private router: Router, private actions$: Actions) {
// M2
        // const login$ = this.actions$
        //     .pipe(
        //         ofType(AuthActions.login),
        //         tap(action => {
        //             localStorage.setItem('user', JSON.stringify(action.user));
        //         })
        // );
        
        // login$.subscribe();


// M1 
        // A bunch of problems 1- repeating the action type, 2- compiler is not sure if action has user property
        // this.actions$.subscribe(action => {
        //     if (action.type == '[Login Page] User Login') {
        //         localStorage.setItem('user', JSON.stringify(action["user"]));
        //     }
                
        // });

    }

}