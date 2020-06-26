import { combineReducers } from 'redux';
import user from './user';
import classes from './classes';
import students from './students';
import config from './config';
import errors from './errors';
import { GET_CLASS_STUDENTS, GET_STUDENTS } from './../Actions/types';

const combination = combineReducers({
    user: user, 
    students: students,
    classes: classes,
    config: config,
    errors: errors,
})

export default (store, action) => {
    const updatedStore = combination(store, action);
    return storeReducer(updatedStore, action);
}

const storeReducer = (store, action) => {
    switch(action.type){
        case GET_CLASS_STUDENTS: 
            
            return store;

        case GET_STUDENTS:

            return store;

        default: return store;
    }
}