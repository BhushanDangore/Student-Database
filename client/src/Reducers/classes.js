import { 
    GET_CLASSES,
    SAVE_CLASS,
    GET_CLASS_STUDENTS, 
    FEED_CLASS_STUDENTS_ARRAY,
} from './../Actions/types';

const initialState = {
    classesArray: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES:
            action.payload.forEach(_class => {
                _class.isClassStudentsFetched = false;
                _class.classStudents =  null;
            })
            return { ...state, classesArray: action.payload }



        case SAVE_CLASS: 
            return { ...state, classesArray: action.payload }



        case GET_CLASS_STUDENTS:
            let classesArray = [...state.classesArray];
            classesArray.forEach(_class => {
                if(action.payload.className === _class.className) _class.isClassStudentsFetched = true;
            })
            return { ...state, classesArray };
            


        case FEED_CLASS_STUDENTS_ARRAY:
            let { classIndex, students } = action.payload;
            let currClass = { ...state.classesArray[classIndex] }
            let indexces = [];

            students.forEach((student, index) => {
                if(student.class.className === currClass.className){
                    indexces.push(index);
                }
            })

            currClass.classStudents = indexces;

            let newClassesArray = [...state.classesArray];
            newClassesArray[classIndex] = currClass;

            return {...state, classesArray: newClassesArray};
            
        default:
            return state;
    }
}