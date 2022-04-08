import React, {useState, useContext, useEffect} from "react";
import { useRouter } from 'next/router'
import Header from "../../components/Header";
import Link from 'next/link';
import axios from 'axios';
import { Context } from "../../context";
import swal from 'sweetalert';
import VendorRoute from "../../components/routes/VendorRoute";
import Image from "../../components/CustomImage";


const MyProducts = () => {

    const {state} = useContext(Context);
    const {user} = state;
	const [products, setProducts] = useState([]);

	const loadProducts = async() => {
		const {data} = await axios.get('/api/vendor/products');
		setProducts(data);
		return data
	};

	useEffect(() => {
		loadProducts();
	}, []);



    

    return(
        <VendorRoute>
        <Header />
        {user ? (
		<>
        <section className="page-header">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="content">
							<h1 className="page-name">Your Product Line Up.</h1>
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
							<li><Link href="/user"><a className={window.location.pathname === "/vendors" ? "active" :""}>Home Dashboard</a></Link></li>
							<li><a href="order.html" className={window.location.pathname === "/orders" ? "active" :""}>Orders</a></li>
							<li><a href="address.html" className={window.location.pathname === "/revenues" ? "active" :""}>Revennue Breakdown</a></li>
							<li><a href="profile-details.html" className={window.location.pathname === "/categories" ? "active" :""}>Categories</a></li>
                            <li><Link href="/vendors/products/create-product" className={window.location.pathname === "/vendors/products/create-product" ? "active" :""}><a>Submit Product for Sale</a></Link></li>

							</ul>
						</div>
					</aside>
					</div>
					{products && products.map(item => {
						return(
							<div class="col-md-4">
									<div class="post">
									<div class="post-thumb">
										<Link href={`vendors/products/detail/${item._id}`}>
											<a>
												<Image 
												src={item.images[0].Location} 
												class="img-responsive"  
												width={1350}
												height={900}
												alt="" />
											</a>
										</Link>
									</div>
									<h2 class="post-title"><a href="blog-single.html">{item.productName}</a></h2>
									<div class="post-meta">
										<ul>
										<li>
											<i class="tf-ion-ios-calendar"></i> 20, MAR 2017
										</li>
										<li>
											<i class="tf-ion-android-person"></i> POSTED BY ADMIN
										</li>
										<li>
											<a href="blog-grid.html"><i class="tf-ion-ios-pricetags"></i> LIFESTYLE</a>,<a href="blog-grid.html"> TRAVEL</a>, <a
											href="blog-grid.html">FASHION</a>
										</li>
										<li>
											<a href="#!"><i class="tf-ion-chatbubbles"></i> 4 COMMENTS</a>
										</li>
										</ul>
									</div>
									<div class="post-content">
										<p>{item.description} </p>
										<a href="blog-single.html" class="btn btn-main">Continue Reading</a>
									</div>
									</div>
								</div>
							)
						})}

						</div>
					</div>
				</div>
		</>) : (
			""
		)}
       
        </VendorRoute>
    )
}


export default MyProducts;