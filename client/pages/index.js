import React, {useEffect, useState, useContext} from "react";
import Nav from "../components/Nav";
import Link from 'next/link';
import {useWeb3} from '../components/providers/web3';
import { useRouter } from "next/router";
import Button from '../components/button'
import { useAccount } from "../components/hooks/web3";
import { useNetwork } from "../components/hooks/web3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faSpinner);

const Home = () => {

    const {web3, isLoading, connect, isWeb3Loaded} = useWeb3();
    console.log(isLoading ? "Metamask Loading" : web3 ? "Metamask initalized" : "Metamask not installed");
    const {account} = useAccount();
    const {network} = useNetwork();
    // console.log(account)
    console.log(network)

    const chainInformatiomn = {
        address:account.data,
        network:{
            data:network.data,
            target:network.target,
            isSupported:network.isSupported,
            hasInitialResponse: network.hasInitialResponse
        }
    }


    return(
        <>
        <section className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xs-12 col-sm-4">
                        <div className="contact-number">
                        <img src="images/marketImages/market3.JPG" style={{maxHeight:75}} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-12 col-sm-4">

                        <div className="logo text-center">
                            <Link href="/">
                                <a>
                                <img src="/svg/HomeSVG.svg"/>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-12 col-sm-4">

                        <ul className="top-menu text-right list-inline">
                            <li className="dropdown cart-nav dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"><i
                                        className="tf-ion-android-cart"></i>Cart</a>
                                <div className="dropdown-menu cart-dropdown">
                                    <div className="media">
                                        <a className="pull-left" href="#!">
                                            <img className="media-object" src="images/shop/cart/cart-1.jpg" alt="image" />
                                        </a>
                                        <div className="media-body">
                                            <h4 className="media-heading"><a href="#!">Ladies Bag</a></h4>
                                            <div className="cart-price">
                                                <span>1 x</span>
                                                <span>1250.00</span>
                                            </div>
                                            <h5><strong>$1200</strong></h5>
                                        </div>
                                        <a href="#!" className="remove"><i className="tf-ion-close"></i></a>
                                    </div>
                                    <div className="media">
                                        <a className="pull-left" href="#!">
                                            <img className="media-object" src="images/shop/cart/cart-2.jpg" alt="image" />
                                        </a>
                                        <div className="media-body">
                                            <h4 className="media-heading"><a href="#!">Ladies Bag</a></h4>
                                            <div className="cart-price">
                                                <span>1 x</span>
                                                <span>1250.00</span>
                                            </div>
                                            <h5><strong>$1200</strong></h5>
                                        </div>
                                        <a href="#!" className="remove"><i className="tf-ion-close"></i></a>
                                    </div>

                                    <div className="cart-summary">
                                        <span>Total</span>
                                        <span className="total-price">$1799.00</span>
                                    </div>
                                    <ul className="text-center cart-buttons">
                                        <li><a href="cart.html" className="btn btn-small">View Cart</a></li>
                                        <li><a href="checkout.html" className="btn btn-small btn-solid-border">Checkout</a></li>
                                    </ul>
                                </div>

                            </li>
                            <li className="pl-3">
                                {isWeb3Loaded ? network.data : "No Web3 Network"}
                            </li>
                                {
                                    (isLoading) ? (
                                        <li>
                                        <a 
                                        classame="btn btn-main mt-20">
                                            Loading...
                                        </a>
                                        </li>
                                    ) : 
                                    isWeb3Loaded ? 
                                    account.data ?
                                    (
                                        <li className="dropdown dropdown-slide">
                                            <span 
                                            classame=" dropdown-toggle btn btn-main mt-20" 
                                            data-toggle="dropdown"
                                            data-hover="dropdown"
                                            style={{width:"100%"}}>
                                                Metamask Connected
                                            </span>
                                            <ul className="dropdown-menu">
                                                <span className="btn btn-main mt-20">{account.data}</span>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li>
                                            <a 
                                            onClick ={connect}
                                            classame="btn btn-main mt-20">
                                                Connect to Wallet
                                            </a>
                                        </li>
                                    ) : 
                                    (
                                    <a onClick={() => window.open("https://metamask.io/", "_blank")}
                                    classame="btn btn-main mt-20">
                                        Install Metamask
                                    </a>
                                    )
                                }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <Nav />
        </>
    )
}


export default Home;