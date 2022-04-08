import React, {useState, useContext, useEffect} from "react";
import { Context } from "../context";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import swal from 'sweetalert';
import {SyncOutlined} from '@ant-design/icons';


const Register = () => {

    const {state, dispatch} = useContext(Context);

    const [firstName, setFirstName] = useState("First Name");
    const [userName, setUserName] = useState("user Name");
    const [lastName, setLastName] = useState("Last Name");
    const [email, setEmail] = useState("Email");
    const [password, setPassword] = useState("Password");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setLoading(true);
            const {data} = await axios.post(`/api/register`, {firstName, userName, lastName, email, password});
                swal({
                    title:"Successfully Created Account",
                    icon: "success"
                  });
                  setLoading(false);
    
                  router.push("/");
        }catch(err){
            swal({
                title:`Unsuccessfull register please ensure all fields are completed ${err}`,
                icon: "error"
              });
              setLoading(false);
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
                <Link href="/">
                    <a className="logo">
                        <img src="images/marketImages/market1.png"  style={{maxHeight:300}} alt="" />
                    </a>
                </Link>
                <h2 className="text-center">Create Your Account</h2>
                <form className="text-left clearfix" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <input type="text" className="form-control"  value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Username" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <input type="email" className="form-control"  placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control"  placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-main text-center" disabled={!email || !firstName || !lastName || !password || loading}>
                        {loading ? <SyncOutlined spin /> : "Sign Up" }
                    </button>
                    </div>
                </form>
                <p className="mt-20">Already hava an account ? <Link href="/login"><a> Login</a></Link></p>
                <p><Link href="#"><a href="forget-password.html"> Forgot your password?</a></Link></p>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default Register;