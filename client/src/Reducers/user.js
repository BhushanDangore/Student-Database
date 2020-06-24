import { GET_USER, SET_SCHOOL_NAME } from './../Actions/types';

const initialState = {
    loggedIn: null,
    loading: true,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            if(action.payload.userName) return { ...action.payload, loggedIn: true }
            return { loggedIn: false }

        case SET_SCHOOL_NAME:
            return { ...state, schoolName: action.payload.schoolName, isProfileComplet: true }

        default:
            return state;
    }
}