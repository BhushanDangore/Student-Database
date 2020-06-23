import { useState } from 'react';

export default function useFetchDataWithLoading(action, defaultState) {
    const [isLoading, setIsLoading] = useState(defaultState || false);
    
    function fetchWithLoading(data){
        setIsLoading(true);
        action(data)
            .then(()=> {
                setIsLoading(false);
            })
    }

    return [isLoading, fetchWithLoading];
}