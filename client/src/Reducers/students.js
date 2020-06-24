import { GET_STUDENTS, GET_CLASS_STUDENTS } from '../Actions/types';

const initialState = {
    studentsArray: null,
    isAllStudentsFetched: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return { ...state, studentsArray: action.payload, isAllStudentsFetched: true }
            
        case GET_CLASS_STUDENTS: 
            if(!state.studentsArray) return { ...state, studentsArray: action.payload.students };

            let rcvdClassStudents = action.payload.students;
            const unExistedStudents = rcvdClassStudents.filter(student => {                     // Check if the student already exist on client side
                for(const stateStudent of state.studentsArray) if(stateStudent.aadharNumber === student.aadharNumber) return false; 
                return true;
            });

            if(!unExistedStudents.length) {
                console.error("No new students are fetched");
                return state;
            };
            console.log("new students are fetched");
            return { ...state, studentsArray: [...state.studentsArray, ...unExistedStudents] };

        default:
            return state;
    }
}