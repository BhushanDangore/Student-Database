import { GET_USER, GET_CLASSES, REQUEST_FAILED, LOGOUT, GET_STUDENTS, SAVE_STUDENT, SET_SCHOOL_NAME, SAVE_CLASS, GET_CLASS_STUDENTS, SET_STUDENTS_LOADING } from '../Actions/types';
import combineReducers from './combineReducer';

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
            return { loading: false, array: action.payload };

        case SAVE_CLASS:
            return { loading: false, array: action.payload };
        
        default:
            return state;
    }
}

function studentsReducer(state, action) {
    switch(action.type) {
        case GET_STUDENTS:
            return { loading: false, array: action.payload }

        case SAVE_STUDENT:
            return { loading: false, array: action.payload };

        case GET_CLASS_STUDENTS: 
            
            if(!state.array) return { array: action.payload.students, loading: false };

            let rcvdClassStudents = action.payload.students;

            const unExistedStudents = rcvdClassStudents.filter(student => {                                 // Check if the student already exist on client side
                for(const stateStudent of state.array) if(stateStudent.aadharNumber === student.aadharNumber) return false;
                return true;
            });

            if(!unExistedStudents.length) {
                return { array: state.array, loading: false }
            };

            return {array: [...state.array, ...unExistedStudents], loading: false };

        case SET_STUDENTS_LOADING:
            return { ...state, loading: true }
        
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