import axios from 'axios';
import { GET_USER, REQUEST_FAILED, GET_CLASSES, LOGOUT, GET_STUDENTS, SAVE_STUDENT, SAVE_CLASS } from './types';

export function getUser(dispatch) {
    axios.get("/api/user")
        .then( res => dispatch({ type: GET_USER, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }))
}

export function getClasses(dispatch) {
    axios.get('/api/classes')
        .then( res => dispatch({ type: GET_CLASSES, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }))
}

export function getStudents(dispatch) {
    axios.get('/api/students/')
        .then( res => dispatch({ type: GET_STUDENTS, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }))
}

export function saveStudent( student, dispatch) {
    axios({
        method: 'POST',
        url: '/api/students',
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8',
            'Accept': 'Token',
            "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify(student),
    })
        .then( res => dispatch({ type: SAVE_STUDENT, payload: res.data }))
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }) )

}

export function saveClassDataInDB( classData, dispatch ) {
    axios({
        method: 'POST',
        url: '/api/classes/class',
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8',
            'Accept': 'Token',
            "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify(classData),
    })
    .then(res => {
        dispatch({ type: SAVE_CLASS, payload: res.data })
    } )
    .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }) )
}

export function logout(dispatch) {
    dispatch({ type: LOGOUT })
}