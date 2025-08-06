import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedin } from "./auth.selectors";
import { tap } from "rxjs/operators";


// need to inject it in the auth modelues under provider, same as auth service. Also added to app modules in the route itself
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router , private store: Store<AppState>) {    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot)
        : Observable<boolean>{

        return this.store
                    .pipe(
                        select(isLoggedin),
                        tap(loggedIn => {
                            if (!loggedIn) {
                                this.router.navigateByUrl('/login');
                           } 
                        })
                    )
        
        
    }
}