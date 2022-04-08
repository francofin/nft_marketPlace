import React, {createContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const initialState = {
    user:null
}


const Context = createContext();

const rootReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, user:action.payload}
        case "LOGOUT":
            return {...state, user:null}
        default:
            return state
    }
    
}


const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type:"LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user'))
        })
    }, [])

    axios.interceptors.response.use(
        function(res){
        //any status code that lie within the range of 2xx will make this trigger.
        return res;
    }, 
    function(error){
        // need status code that are out the range of 2xx causes this to fire
        let res = error.response;
        if(res.status === 401 && res.config && !res.config.__isRetryRequest){
            return new Promise((resolve, reject) => {
                axios.get('/api/logout')
                .then((data) => {
                    dispatch({
                        type:"LOGOUT"
                    });
                    window.localStorage.removeItem("user");
                    router.push('/login');

                }).catch(err => {
                    console.log("Axios Interceptor error", err);
                    reject(err);
                })
            })
        } 

        return Promise.reject(error);
    });

    useEffect(() => {
        const getCsrfToken = async () => {
            const {data} = await axios.get('/api/csrf-token');
            console.log("CSRF DATA", data);
            axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
        }

        getCsrfToken();
    }, []);

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {
    Context,
    ContextProvider
};
