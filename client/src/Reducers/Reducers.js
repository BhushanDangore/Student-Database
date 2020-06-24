import { combineReducers } from 'redux';
import user from './user';
import classes from './classes';
import students from './students'
import config from './config'

const combinedReducer = combineReducers({
    user: user, 
    classes: classes,
    students: students,
    config: config,
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