import { combineReducers } from 'redux';
import user from './user';
import classes from './classes';
import students from './students'

const combinedReducer = combineReducers({
    user: user, 
    classes: classes,
    students: students
})

export default (store, action) => {
    
    const nextStore = storeReducer(store, action);
    if(store !== nextStore) return nextStore;

    return combinedReducer(store, action);
}

const storeReducer = (store, action) => {
    switch(action.type){
        
        default: return store;
    }
}