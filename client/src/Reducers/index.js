import { GET_USER, GET_CLASSES, REQUEST_FAILED, LOGOUT, GET_STUDENTS, SAVE_STUDENT, SET_SCHOOL_NAME, SAVE_CLASS } from '../Actions/types';
import combineReducers from 'combine-reducers';

function userReducer(state, action) {
    console.log("Reducer Called ACTION: "+ action.type)
    switch (action.type) {
        case GET_USER:
            if(action.payload.userName) return { ...action.payload, loading: false, loggedIn: true }
            else return { loggedIn: false, loading: false }

        case SET_SCHOOL_NAME: 
            return {...state, schoolName: action.payload.schoolName, isProfileComplet: true }
        default:
            return state;
    }

}

function classesReducer(state, action) {
    switch(action.type) {
        case GET_CLASSES:
            return action.payload;

        case SAVE_CLASS:
            return action.payload;
        
        default:
            return state;
    }
}

function studentsReducer(state, action) {
    switch(action.type) {
        case GET_STUDENTS:
            return action.payload
        case SAVE_STUDENT:
            return action.payload;
        default:
            return state;
    }
}

function teachersReducer(state, action) {
    switch(action.type) {
        
        default:
            return state;
    }
}

function extrasReducer(state, action) {
    switch(action.type) {
        case REQUEST_FAILED:
            return {...state, error: "Fail"}

        case LOGOUT:
            localStorage.removeItem('newStudentFormData');
            return {}

        default:
            return state
    }
}

export default combineReducers({
    user: userReducer,
    classes: classesReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    extras: extrasReducer
})