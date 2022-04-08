import React, {useState, useContext, useEffect} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { Context } from "../context";
import swal from 'sweetalert';
import {SyncOutlined} from '@ant-design/icons';



const Login = () => {
    const [email, setEmail] = useState("Email");
    const [password, setPassword] = useState("Password");
    const router = useRouter();
    const {state, dispatch} = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            // setLoading(true);
            const {data} = await axios.post(`/api/login`, {email, password});
                swal({
                    title:"Successfully Logged In",
                    icon: "success"
                  });
                  dispatch({
                      type:"LOGIN",
                      payload:data,
                  });
                  window.localStorage.setItem('user', JSON.stringify(data));
                //   setLoading(false);
                  router.push("/user");
                  console.log("LOGIN RESPONSE", data)
        }catch(err){
            swal({
                title:`Unsuccessfull register please ensure all fields are completed ${err}`,
                icon: "error"
              });
            //   setLoading(false);
              console.log(err);
        }   
    }


    useEffect(() => {
        if(state.user !== null){
            router.push('/');
        }
    }, [state.user])

    

    return(

        <section className="signin-page account">
        <div className="container">
            <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="block text-center">
                <a className="logo" href="/">
                    <img src="images/marketImages/market2.png" style={{maxHeight:300}} alt="" />
                </a>
                <h2 className="text-center">Welcome Back</h2>
                <form className="text-left clearfix" onSubmit={handleSubmit} >
                    <div className="form-group">
                    <input type="email" className="form-control"  placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-main text-center" >Login</button>
                    </div>
                </form>
                <p className="mt-20">New in this site ?<Link href="/register"><a> Create New Account</a></Link></p>
                <p><Link href="/forgotpassword"><a> Forgot your password?</a></Link></p>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default Login;