import React, {useState, useContext, useEffect} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import Header from "../../components/Header";


const BecomeVendor = () => {

    const {state} = useContext(Context);
    const {user} = state;

    const [loading, setLoading] = useState(false);


    const becomeVendor =  () => {

        setLoading(true);
        axios.post('/api/make-vendor')
        .then((res) => {
            console.log(res);
            window.location.href = res.data;
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    

    return(
        <UserRoute>
        <Header />
        <section className="page-wrapper success-msg">
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <div className="block text-center">
                        <i className="tf-ion-android-checkmark-circle"></i>
                    <h2 className="text-center">Become A Vendor and Contribute to the Market Place</h2>
                    <p>We'll make the process from account creation to set up and uploading products as easy as possible. First Step, Lets set up your bank account with stripe so you can get paid.</p>
                    <button className="btn btn-main mt-20" onClick={becomeVendor}>Set Up Stripe.</button>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </UserRoute>
    )
}


export default BecomeVendor;