import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  loading = true;

  // no point in keeping sending this value to the frontend again and again, only send it when it changes from the last time
  // therefore we are using distinctUntilChanged(), a property of rxjs
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
   

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {

    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe(event  => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store
      .pipe(
        // !! return true if there is a profile, false otherwise
        map(state => !!state["auth"].user),
        distinctUntilChanged()

      );

    console.log(this, this.isLoggedIn$);
    
    this.isLoggedOut$ = this.store
      .pipe(
        // select does the job for both map and removing duplicates (dispatching again and again even when there is no cahnge in the observable). It only sends the value forward when the value is changed.
        
        // now we again dont want to do the computation again when the input that is the state doesnt change. So we are going to use a createSelector function under the auth.selector file
        // one created using createSelector has memory and this saves us extra computations when the input doesnt change
        select(isLoggedOut)
      );


  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }

}
