import React, {useContext} from 'react';
import Link from 'next/link';
import {Context} from '../context';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useAccount } from "./hooks/web3";
import {useWeb3} from '../components/providers/web3';

const Nav = () => {

    const {state, dispatch} = useContext(Context);
    const {user} = state;
    const router = useRouter();
    const {web3, isLoading, connect, isWeb3Loaded} = useWeb3();
    console.log(isLoading ? "Metamask Loading" : web3 ? "Metamask initalized" : "Metamask not installed");
    const {account} = useAccount();
    // console.log("From Nav", account)


    const logOut = async () => {
        try{ 
            dispatch({
            type:"LOGOUT"
            });
        window.localStorage.removeItem('user');
        const {data} = await axios.get('/api/logout');
        console.log(data);

        router.push('/');
    } 
        catch(err){
            console.log(err);
        }
    }
    return(
        <section className="menu">
            <nav className="navbar navigation">
                <div className="container">
                    <div className="navbar-header">
                        <h2 className="menu-title">Main Menu</h2>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                    </div>
                    <div id="navbar" className="navbar-collapse collapse text-center">
                        <ul className="nav navbar-nav">

                            <li className="dropdown ">
                                <Link href="/">
                                <a>Home</a>
                                </Link>
                            </li>
                            <li className="dropdown dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="350"
                                    role="button" aria-haspopup="true" aria-expanded="false">Shop <span
                                        className="tf-ion-ios-arrow-down"></span></a>
                                <div className="dropdown-menu">
                                    <div className="row">

                                        <div className="col-lg-6 col-md-6 mb-sm-3">
                                            <ul>
                                                <li className="dropdown-header">Pages</li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="shop.html">Shop</a></li>
                                                <li><a href="checkout.html">Checkout</a></li>
                                                <li><a href="cart.html">Cart</a></li>
                                                <li><a href="pricing.html">Pricing</a></li>
                                                <li><a href="confirmation.html">Confirmation</a></li>

                                            </ul>
                                        </div>

                                        <div className="col-lg-6 col-md-6 mb-sm-3">
                                            <ul>
                                                <li className="dropdown-header">Layout</li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="product-single.html">Product Details</a></li>
                                                <li><a href="shop-sidebar.html">Shop With Sidebar</a></li>

                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li className="dropdown full-width dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="350"
                                    role="button" aria-haspopup="true" aria-expanded="false">Pages <span
                                        className="tf-ion-ios-arrow-down"></span></a>
                                <div className="dropdown-menu">
                                    <div className="row">

                                        <div className="col-sm-3 col-xs-12">
                                            <ul>
                                                <li className="dropdown-header">Introduction</li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="contact.html">Contact Us</a></li>
                                                <li><a href="about.html">About Us</a></li>
                                                <li><a href="404.html">404 Page</a></li>
                                                <li><a href="coming-soon.html">Coming Soon</a></li>
                                                <li><a href="faq.html">FAQ</a></li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-3 col-xs-12">
                                            <ul>
                                                <li className="dropdown-header">Dashboard</li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="dashboard.html">User Interface</a></li>
                                                <li><a href="order.html">Orders</a></li>
                                                <li><a href="address.html">Address</a></li>
                                                <li><a href="profile-details.html">Profile Details</a></li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-3 col-xs-12">
                                            <ul>
                                                <li className="dropdown-header">Utility</li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="login.html">Login Page</a></li>
                                                <li><a href="signin.html">Signin Page</a></li>
                                                <li><a href="forget-password.html">Forget Password</a></li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-3 col-xs-12">
                                            <a href="shop.html">
                                                <img className="img-responsive" src="images/shop/header-img.jpg" alt="menu image" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                            <li className="dropdown dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="350"
                                    role="button" aria-haspopup="true" aria-expanded="false">Elements <span
                                        className="tf-ion-ios-arrow-down"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="typography.html">Typography</a></li>
                                    <li><a href="buttons.html">Buttons</a></li>
                                    <li><a href="alerts.html">Alerts</a></li>
                                </ul>
                            </li>
                            
                            {user ? (
                            <>
                            <li className="dropdown dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="350"
                                    role="button" aria-haspopup="true" aria-expanded="false"> {user.firstName}'s Profile <span
                                        className="tf-ion-ios-arrow-down"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a onClick={logOut}>Logout</a></li>
                                    <li><Link href="/user"><a>Profile</a></Link></li>
                                    <li><a href="blog-full-width.html">Account History</a></li>
                                    <li><a href="blog-grid.html">Purchases</a></li>
                                    <li><a href="blog-single.html">Blog Single</a></li>
                                    {account.isAdmin && <li><a>Admin Account </a></li>}
                                </ul>
                            </li>
                            </>) : (
                            <>
                            <li className="dropdown">
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                            </li>
                            <li className="dropdown">
                                <Link href="/register">
                                    <a>Sign Up</a>
                                </Link>
                            </li>
                            </>)}
                        </ul>

                    </div>
                </div>
            </nav>
        </section>
    )
}


export default Nav;