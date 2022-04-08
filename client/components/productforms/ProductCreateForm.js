import React, {useState, useContext, useEffect} from "react";
import Image from "../CustomImage";
import {Badge} from 'antd';

const ProductCreateForm = ({handleSubmit, handleChange, handleImage, values, setValues, preview, uploadButtonText, handleImageRemove}) => {


    return(

        <form role="form" onSubmit={handleSubmit}>
    
        <div className="form-group">
            <input type="text" placeholder="Product Name" className="form-control" name="productName" values={values.productName} onChange={handleChange}/>
        </div>
        
        <div className="form-group">
            <textarea placeholder="Product Description" rows="10" className="form-control" name="description" values={values.description} onChange={handleChange} />
        </div>
        <div className="form-group">
            <div className="product-size">
                <p>Is this Product for sale?</p>
                <select className="form-control" onChange={(e) => setValues({...values, paid: !values.paid, forTransfer :!values.forTransfer})}>
                    <option value={true}>Product is for Sale</option>
                    <option value={false}>For Trade/Donation</option>
                </select>
            </div>
        </div>
        {values.paid ? (
            <div className="form-group">
                <input type="floar" placeholder="Enter Product Price" className="form-control" name="price" values={values.price} onChange={handleChange}/>
            </div>
        ) : (
                <div className="form-group">
                    <textarea type="text" placeholder="Brief Item Condition" className="form-control" name="tradeDonateCondition" values={values.tradeDonateCondition} onChange={handleChange}></textarea>
                </div>
        )}
        
            <div className="form-group">
                <input type="text" placeholder="Category" className="form-control" name="category" values={values.category} onChange={handleChange}/>
            </div>
        
        <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left" >
                {uploadButtonText}
                <input type="file" name="images" onChange={handleImage} accept="image/*" hidden/>
            </label>

                {preview && (
                    <div className="col">
                    <Badge count='X' onClick={handleImageRemove} className="pointer" />
                        <Image
                        src={`${preview}`}
                        width={1350}
                        height={900}
                        style={{borderRadius:'20px!important'}}
                        layout="responsive"
                        loading="eager"
                        className="img-fluid img-gallery"
                        sizes="35vw"
                    />
                </div>
                )}

        </div>
        
        <div className="form-group">
            <textarea rows="10" placeholder="Any additional Details You Would Like to Add?" className="form-control" name="additionalDetails" values={values.additionalDetails} onChange={handleChange}></textarea>	
        </div>
        
        
        <div>
            <input id="contact-submit" className="btn btn-transparent" onClick={handleSubmit} disabled={values.loading || values.uploading} placeholder={values.loading ? "Saving" : "Save and Continue"}/>
        </div>						
        
    </form>
        
    )
}

export default ProductCreateForm;