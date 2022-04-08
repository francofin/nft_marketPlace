import React, {useEffect, useState, useContext} from "react";
import Header from "../Header";
import Link from 'next/link';
import {Context} from '../../context';
import axios from 'axios';
import {SyncOutlined} from '@ant-design/icons';
import { useRouter } from "next/router";

//Add spinner component.

const VendorRoute = ({children}) => {
   
    const [ok, setOk] = useState(false);
    const router = useRouter();

    const fetchVendor = async() => {
        try{
            const {data} = await axios.get('/api/current-vendor');
            console.log(data);
            if (data.ok) {
                setOk(true);
            }
        } catch(err){
            console.log(err);
            setOk(false);
            router.push('/');
        }
    }

    useEffect(() => {

        fetchVendor();
        
    }, [])


    return (
        <>
        {!ok ? (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>
        
    ) : (
        <>
        {children}
        </>
    )}
        </>
    )
}

export default VendorRoute;