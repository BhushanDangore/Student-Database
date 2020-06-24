import { 
    TOGGLE_DRAWER,
    CLOSE_DRAWER
} from './../Actions/types';

const initialState = {
    mobileOpen: false,
}

export default (state = initialState, action) => {

    switch(action.type){
        
        case TOGGLE_DRAWER: return {...state, mobileOpen: !state.mobileOpen}

        case CLOSE_DRAWER: return {...state, mobileOpen: false}

        default: return state
    }

}