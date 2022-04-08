import React, {useState, useContext, useEffect} from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from "../../../components/Header";
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { Context } from "../../../context";
import swal from 'sweetalert';
import VendorRoute from "../../../components/routes/VendorRoute";
import ProductCreateForm from "../../../components/productforms/ProductCreateForm";


const AddProduct = () => {
    const {state} = useContext(Context);
    const {user} = state;
    const router = useRouter();
    console.log("User", user)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    const [values, setValues] = useState({
        productName:'',
        description:'',
        category:'',
        price:'',
        uploading:false,
        paid:true,
        forTransfer:false,
        loading:false,
        images:[],
        additionalDetails:'',
        tradeDonateCondition:'',
    });

    //Put image url in setImage to set image state
    const [image, setImage] = useState({});

    const [preview, setPreview] = useState('');


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleImageRemove = async () => {
        try {
            setValues({...values, loading:true});
            const res = await axios.post('/api/product/remove-image', {image});
            setImage({});
            setPreview('');
            setUploadButtonText('Upload Image');
            setValues({...values, loading:false});
            console.log("Remove Image")
        } catch (err){
            console.log(err);

            setValues({...values, loading:false});
            swal({
                title:`Failed to Delete Image ${err}`,
                icon: "error"
              });
        }
    }

    const handleImage = (e) => {
        //Show Preview
        let file = e.target.files[0];
        setUploadButtonText(file.name);
        setPreview(window.URL.createObjectURL(file));
        setValues({...values, loading:true});

        //file, height, width, compressionformat, quality, rotation, callback
        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async(uri) => {
            try{
                let {data} = await axios.post('/api/product/upload-image', {
                    image: uri,
                });
                console.log("IMAGE UPLOAD", data);
                //set image in state.and loading to false.
                setImage(data);
                setValues({...values, loading:false, images:[data]});
            }catch(err){
                console.log(err);
                setValues({...values, loading:false});
                swal({
                    title:`Failed to Upload Image ${err}`,
                    icon: "error"
                  });
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/product', {
                ...values,
            });
            swal({
                title:"Successfully Uploaded Information, Add any additional product details if needed.",
                icon: "success"
              });
              router.push('/vendors')
        }catch(err){
            console.log(err);
            swal({
                title:`Failed to Upload Product ${err}`,
                icon: "error"
              });
        }
        
    }


    return(
        <VendorRoute>
        <Header />
        {
            user ? (
                <>
            <section className="page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="content">
                            <h1 className="page-name">Add a Product to Your Line Up</h1>
                            <ol className="breadcrumb">
                                <li><Link href="/"><a>Home</a></Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div>
                <ul className="list-inline dashboard-menu text-center">
                    <li><Link href="/user"><a className={window.location.pathname === "/vendors" ? "active" :""}>Product Dashboard</a></Link></li>
                    <li><a href="order.html" className={window.location.pathname === "/orders" ? "active" :""}>Orders</a></li>
                    <li><a href="address.html" className={window.location.pathname === "/revenues" ? "active" :""}>Revenue Breakdown</a></li>
                    <li><a href="profile-details.html" className={window.location.pathname === "/categories" ? "active" :""}>Categories</a></li>
                    <li><Link href="/vendors/products/create-product"><a className={window.location.pathname === "/vendors/products/create-product" && "active"}>Submit Product for Sale</a></Link></li>
                </ul>
                </div>


        <section className="page-wrapper">
            <div className="contact-section">
            
                <div className="container">
               
                    <div className="row">
                        <div className="contact-form col-md-6">
                            <ProductCreateForm 
                            handleSubmit={handleSubmit} 
                            handleImage={handleImage} 
                            handleChange={handleChange} 
                            values={values} 
                            setValues={setValues}
                            preview={preview}
                            setPreview={setPreview}
                            uploadButtonText={uploadButtonText}
                            handleImageRemove={handleImageRemove}/>
                            

                        </div>
                       

                  
                        <div className="contact-details col-md-6 ">
                            <div className="pull-left">
                                <img className="media-object user-img" src="../../images/marketImages/peace.jpg" alt="Image" style={{height:"100%", width:"130%"}}/>
                            </div>
                        </div>
                       
                            
                        
                    
                    </div> 
                </div>
            </div>
        </section>
        </>) : (
                ""
            )
        }
        </VendorRoute>
    )
}


export default AddProduct;