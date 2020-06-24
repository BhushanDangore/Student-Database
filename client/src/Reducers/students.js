import { GET_STUDENTS, GET_CLASS_STUDENTS } from '../Actions/types';

const initialState = {
    studentsArray: null,
    studentsCount: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return { ...state, studentsArray: action.payload, studentsCount: action.payload.length }
            
        case GET_CLASS_STUDENTS: 
            return { ...state, studentsArray: action.payload.students, studentsCount: action.payload.length }

        default:
            return state;
    }
}