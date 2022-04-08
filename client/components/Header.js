import React, {useEffect, useState, useContext} from "react";
import Nav from "./Nav";
import Link from 'next/link';

const Header = () => {
    return(
        <>
        <section className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xs-12 col-sm-4">
                        <div className="contact-number">
                        <img src="images/marketImages/market3.jpg" style={{maxHeight:75}} alt="" />
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
                            <li className="dropdown search dropdown-slide">
                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"><i
                                        className="tf-ion-ios-search-strong"></i> Search</a>
                                <ul className="dropdown-menu search-dropdown">
                                    <li>
                                        <form action="post"><input type="search" className="form-control" placeholder="Search..." /></form>
                                    </li>
                                </ul>
                            </li>
                            <li className="commonSelect">
                                <select className="form-control">
                                    <option>EN</option>
                                    <option>DE</option>
                                    <option>FR</option>
                                    <option>ES</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <Nav />
        </>
    )
}


export default Header;