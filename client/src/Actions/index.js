import axios from 'axios'
import { 
    GET_USER, 
    REQUEST_FAILED, 
    GET_CLASSES, 
    GET_STUDENTS, 
    SAVE_STUDENT, 
    SAVE_CLASS, 
    GET_CLASS_STUDENTS,
    SET_SCHOOL_NAME,
    TOGGLE_DRAWER,
    CLOSE_DRAWER,
    FEED_CLASS_STUDENTS_ARRAY,
} from './types';

export const toggleDrawer = { type: TOGGLE_DRAWER }
export const cloaseDrawer = { type: CLOSE_DRAWER }

export function fetchUser() {
    return function (dispatch) {
      axios.get("/api/user")
        .then(res => dispatch({type: GET_USER, payload: res.data}))
        .catch(res => dispatch({ type: REQUEST_FAILED, payload: res }))
}}

export function fetchStudents(){
    return function (dispatch) {
        axios.get('/api/students/')
            .then( res => dispatch({ type: GET_STUDENTS, payload: res.data }))
            .catch( res => dispatch({ type: REQUEST_FAILED, payload: res }))
    }
}

export function fetchClasses(){
    return function (dispatch) {
        axios.get('/api/classes/')
            .then( res => dispatch({ type: GET_CLASSES, payload: res.data }))
            .catch( res => dispatch({ type: REQUEST_FAILED, payload: res }))
    }
}

export function fetchClassStudents(className){
    return function(dispatch) {
        axios.get(`/api/classes/class/${className}`)
            .then(res => dispatch({type: GET_CLASS_STUDENTS, payload: res.data}))
            .catch(res => dispatch({ type: REQUEST_FAILED, payload: res }))
    }
}

export function feedClassStudentsArray(students, classIndex) {
    return {
        type: FEED_CLASS_STUDENTS_ARRAY,
        payload: { students, classIndex }
    }
}

export function saveNewClassData(data){
    return function(dispatch) {
        axios({
            method: 'POST',
            url: '/api/classes/class',
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
            },
            data: JSON.stringify(data),
        })
        .then(res => dispatch({ type: SAVE_CLASS, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res }))
    }
}

export function saveNewStudentData(data){
    return function (dispatch) {
        axios({
            method: 'POST',
            url: '/api/students',
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
            },
            data: JSON.stringify(data),
        })
        .then( res => dispatch({ type: SAVE_STUDENT, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res }) )
    }

}

export function saveProfileConfiguration(data){
    return function(dispatch) {
        axios({
            method: 'POST',
            url: '/api/user/school-name',
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
            },
            data: JSON.stringify(data),
        })
        .then( res => {
            if(res.status === 201 && res.data.schoolName){
                dispatch({type: SET_SCHOOL_NAME, payload: res.data})
            }
        })
        .catch( res => {
            dispatch({type: REQUEST_FAILED, payload: res})
        })
    }
}