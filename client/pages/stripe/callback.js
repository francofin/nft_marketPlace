import React, {useContext, useEffect} from 'react';
import { Context } from '../../context';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import Header from "../../components/Header";
import { useRouter } from 'next/router'
import Link from 'next/link';





const StripeCallback = () => {

    const {state, dispatch} = useContext(Context);
    const {user} = state
    const router = useRouter();

    useEffect(() => {

        if(user){
            axios.post('/api/get-account-status')
            .then((res) => {
                console.log(res);
                dispatch({
                    type:'LOGIN',
                    payload: res.data
                });
                window.localStorage.setItem("user", JSON.stringify(res.data));
                router.push("vendors");
            });
        }

    }, [user])

    return(
        <SyncOutlined spin className='d-flex justify-content-center display-1 text-primary p-5' />

    )
}

export default StripeCallback;