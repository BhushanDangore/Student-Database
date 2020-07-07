import { GET_STUDENTS, GET_CLASS_STUDENTS } from '../Actions/types';
import defineNameGetter from '../Utils/defineNameGetter'

const initialState = {
    studentsArray: null,
    isAllStudentsFetched: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            defineNameGetter(action.payload);
            return { ...state, studentsArray: action.payload, isAllStudentsFetched: true }
            
        case GET_CLASS_STUDENTS: 
            if(!state.studentsArray) {
                const { students } = action.payload;
                defineNameGetter(students);
                return { ...state, studentsArray: students };
            }
            

            let rcvdClassStudents = action.payload.students;
            const unExistedStudents = rcvdClassStudents.filter(student => {                     // Check if the student already exist on client side
                for(const stateStudent of state.studentsArray) if(stateStudent.aadharNumber === student.aadharNumber && student.class.className === stateStudent.class.className) return false; 
                return true;
            });
            defineNameGetter(unExistedStudents);
            if(unExistedStudents.length) return { ...state, studentsArray: [...state.studentsArray, ...unExistedStudents] };
            
            return state;

        default:
            return state;
    }
}