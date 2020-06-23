import axios from 'axios';
import { 
    GET_USER, 
    REQUEST_FAILED, 
    GET_CLASSES, 
    LOGOUT, 
    GET_STUDENTS, 
    SAVE_STUDENT, 
    SAVE_CLASS, 
    GET_CLASS_STUDENTS,
} from './types';

let dispatch;

export function setDispatchRef(ref){
    dispatch = ref;
}

export function getUser() {
        return axios.get("/api/user")
            .then( res => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch( res => {
                dispatch({ type: REQUEST_FAILED, payload: res.data });
            })
}

export function getClasses() {

    return axios.get('/api/classes')
        .then( res => {
            dispatch({ type: GET_CLASSES, payload: res.data })
        })
        .catch( res => {
            dispatch({ type: REQUEST_FAILED, payload: res.data })
        })
}

export function getStudents() {

    return axios.get('/api/students/')
        .then( res => {
            dispatch({ type: GET_STUDENTS, payload: res.data });
        })
        .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }))
}

export function saveStudent(student) {
    return axios({
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

export function getClassStudents(className) {

    return axios.get(`/api/classes/class/${className}`)
        .then(res => dispatch({type: GET_CLASS_STUDENTS, payload: res.data}))
        .catch(res => dispatch({ type: REQUEST_FAILED, payload: res.data }))
}

export function saveClassDataInDB(classData) {
    return axios({
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
    })
    .catch( res => dispatch({ type: REQUEST_FAILED, payload: res.data }) )
}

export function logout() {
    dispatch({ type: LOGOUT })
}