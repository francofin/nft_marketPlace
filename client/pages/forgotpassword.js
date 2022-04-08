import React, {useState, useContext, useEffect} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { Context } from "../context";
import swal from 'sweetalert';
import {SyncOutlined} from '@ant-design/icons';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);


    const {state} = useContext(Context);
    const {user} = state;
    const router = useRouter();

    useEffect(() => {
        if(user){
            router.push("/")
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            
            const {data} =await axios.post('/api/forgot-password', {email});
            setSuccess(true);
            console.log(data);
            setLoading(false);
            swal({
                title:"Check email for your reset code.",
                icon: "success"
              });

        } catch(err){
            console.log(err);
            setLoading(false);
            swal({
                title:`Unsuccessfull Reset: ${err}`,
                icon: "error"
              });
        }
    };

    const handleResetPasswrod = async (e) => {
        e.preventDefault();
        console.log(email, code, newPassword);
        try{
            setLoading(true);
            const {data} = await axios.post('/api/reset-password', {email, code, newPassword});
            setEmail("");
            setCode("");
            setNewPassword("");
            setLoading(false);
            swal({
                title:"Password Successfully Reset, Please Log in.",
                icon: "success"
              });
              router.push("/login")
        } catch (err){
            setLoading(false);
            swal({
                title:`Unsuccessfull Reset: ${err}`,
                icon: "error"
              });
        }
    }

    // const handleConfirmPassword = (e)

    return(
        <section className="forget-password-page account">
        <div className="container">
            <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="block text-center">
                <a className="logo" href="index.html">
                    <img src="images/marketImages/market4.jpeg" style={{maxHeight:300}} alt="" />
                </a>
                <h2 className="text-center">Welcome Back</h2>
                <form className="text-left clearfix" onSubmit={success ? handleResetPasswrod : handleSubmit}>
                    <p>Please enter the email address for your account. A verification code will be sent to you. Once you have received the verification code, you will be able to choose a new password for your account.</p>
                    <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Account email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {success ?
                    <div style={{paddingTop:20}}>
                    <p>Please enter the code sent to your email.</p>
                    <div className="form-group">
                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Secret Code" value={code} onChange={(e) => setCode(e.target.value)}/>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputEmail1" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputEmail1" placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </div>
                    </div> : ""}
                    <div className="text-center">
                    <button type="submit" className="btn btn-main text-center">{ success ? "Reset Password" : "Request password reset" }</button>
                    </div>
                </form>
                <p className="mt-20"><a href="login.html">Back to log in</a></p>
                </div>
            </div>
            </div>
        </div>
        </section>
    )

};


export default ForgotPassword