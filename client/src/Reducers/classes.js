import { 
    GET_CLASSES,
    SAVE_CLASS,
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


        case SAVE_CLASS:                                                        //TODO: The API should return just the newely created class.
            return { ...state, classesArray: action.payload }


        default:
            return state;
    }
}