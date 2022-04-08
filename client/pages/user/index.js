import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/Header";
import Link from 'next/link';
import {Context} from '../../context';
import axios from 'axios';
import UserRoute from "../../components/routes/UserRoute";
import VendorRoute from "../../components/routes/VendorRoute";

const userProfile = () => {

    const {state} = useContext(Context);
    const {user} = state;


    return(
        <UserRoute>
        <Header />
		{user ? (
		<>
        <section className="page-header">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="content">
							<h1 className="page-name">Welcome Back</h1>
							<ol className="breadcrumb">
								<li><a href="index.html">Home</a></li>
								<li className="active">{user ? `${user.firstName}'s Account` : "" }</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>

		<div className="page-wrapper">
			<div className="container">
				<div className="row">
				<div className="col-md-4">
					<aside className="sidebar">
						<div className="widget widget-subscription">
							<h4 className="widget-title">Get notified updates</h4>
							<form>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Search Information" />
							</div>
							<button type="submit" className="btn btn-main">I am in</button>
							</form>
						</div>
						<div className="widget widget-category">
						<h4 className="widget-title">Your Profile</h4>
							<ul className="list text-left">
								<li><Link href="/"><a className={window.location.pathname === "/user" ? "active" :""}>Home</a></Link></li>
								<li><a href="order.html">Messages</a></li>
								<li><a href="address.html">Address</a></li>
								<li><a href="profile-details.html">Profile Details</a></li>
								{user.role && user.role.includes("Vendor") ? ( 
										<li><Link href="/vendors"><a>Your Product Homepage</a></Link></li>
										) : (
											<li><Link href="/user/become-vendor"><a>Become a Vendor</a></Link></li>  
										)
								}
							</ul>
						</div>
					</aside>
					</div>
					<div className="col-md-8 dashboard-wrapper user-dashboard">
						<div className="media">
							<div className="pull-left">
								<img className="media-object user-img" src="images/marketImages/profilepic1.jpg" alt="Image" />
							</div>
							<div className="media-body">
								<h2 className="media-heading">Welcome {user.firstName}</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, iure, est. Sit mollitia est maxime! Eos
									cupiditate tempore, tempora omnis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, nihil. </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>) : (
			""
		)}
</UserRoute>
    )
}


export default userProfile;