import { REQUEST_FAILED } from './../Actions/types';

export default function(state = {}, action){
    switch(action.type){
        case REQUEST_FAILED: 
            const { response } = action.payload;
            return { errorMsg: response.data.msg, status: response.status }
            
        default: return {};

    }
}