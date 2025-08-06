import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.action";
import { areCoursesLoaded } from "./courses.selector";


@Injectable()
export class CoursesResolver implements Resolve<any>{

    loading = false;
    constructor(private store: Store<AppState>) {
        
    }

    // currently activated route currently in the addressbar, second is for query paremeters etc
    // in the course module, add the resolver to the path
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
        
        return this.store
            .pipe(
                select(areCoursesLoaded),
                // courses loaded is the boolean flag returned by the reducer
                tap(coursesLoaded => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                // this filter waits for areCoursesLodaed to get true, only after it becomes true does the observable completes 
                filter(coursesLoaded => coursesLoaded),
                first(),
                // once the observable is completed, that is the data is fetched and is avaiable to the user, loading flag is reset
                finalize(() => this.loading = false)
            )   
    }

}