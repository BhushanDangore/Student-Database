import { GET_TEACHERS, SAVE_TEACHER } from "../Actions/types";

const initialState = {
    teachersArray: null
}
export default function(state = initialState, action) {
    switch(action.type){
        case GET_TEACHERS:
            return { teachersArray: [...action.payload.teachers] }

        case SAVE_TEACHER:
            return { ...state, teachersArray: [...state.teachersArray, action.payload.teacher] }

        default: return state;
    }
}