import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { allCoursesLoaded } from "../course.action";


export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean;
    
    // this can get confusing and costly so we will use entity state
    // entities: { [key: number]: Course },
    // // ids is for saving the order of hte courses
    // ids: number[]
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: (course) => course.courseId 

    
});
  

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false,
});


// need to play this reduced into coursesModule
export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, (state, action) =>
        adapter.setAll(action.courses, {...state, allCoursesLoaded: true})
    ),
    on(CourseActions.courseUpdated, (state, action) => 
        adapter.updateOne(action.update, state)
    )
)


//  returns an array of all the entities from your store's state.
export const {selectAll} = adapter.getSelectors();