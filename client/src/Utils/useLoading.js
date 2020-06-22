import { useState } from 'react';

let _dispatch;

export default function useFetchDataWithLoading(action, defaultState, dispatch) {
    const [isLoading, setIsLoading] = useState(defaultState || false);
    
    if(!_dispatch)  _dispatch = dispatch;
    
    function fetchWithLoading(data){
        setIsLoading(true);
        action(_dispatch, data)
            .then(()=> {
                setIsLoading(false);
            })
    }

    return [isLoading, fetchWithLoading];
}