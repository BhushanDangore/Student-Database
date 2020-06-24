import { GET_CLASSES } from './../Actions/types';

const initialState = {
    classesArray: null,
    classCount: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES:
            return { ...state, classesArray: action.payload, classCount: action.payload.length }
            
        default:
            return state;
    }
}