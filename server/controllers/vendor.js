const User = require('../models/User')
const Product = require('../models/Product');
import {nanoid} from 'nanoid';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import queryString from 'query-string';

export const makeVendorController = async(req, res) => {

    //Find user, if user does not have stripe account id, create new. save user stripe account id in the database. 
    //Create account link based on account id for front end to complete onbairding. 
    //Prefill optional information
    //Send URL response to front end. 
    //send account link as json to front end. 

    try{
        const user = await User.findById(req.user._id).exec();
        if(!user.stripe_account_id){
            const account = await stripe.accounts.create({type:"express"})
            console.log("Stripe Account Object", account);
            user.stripe_account_id = account.id;
            user.save();
        }
    
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type:'account_onboarding'
        });
    
        
    
        accountLink = Object.assign(accountLink, {
            "stripe_user[email]":user.email,
        });

        console.log(accountLink);
    
        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
    } catch(err){
        console.log("Create Vendor Server Error", err)
    }

}

export const accountStatusController = async (req, res) => {

    try{

        const user = await User.findById(req.user._id).exec();
        const stripeAccount = await stripe.accounts.retrieve(user.stripe_account_id);
        console.log("Stripe Account From Server", stripeAccount);

        if(!stripeAccount.charges_enabled){
            return res.status(401).send("Unauthorized Access");
        } else{
            //
            const updatedUser = await User.findByIdAndUpdate(user._id, {stripe_seller: stripeAccount, $addToSet: {role: 'Vendor'}}, {new: true}).select("-password").exec();
            // updatedUser.password= undefined;
            res.json(updatedUser);
        }

    } catch(err){
        console.log("Account Status Controller", err);
    }
}


export const currentVendorController = async(req, res) => {
    try{

        let user = await User.findById(req.user._id).select("-password").exec();
        if(!user.role.includes("Vendor")){
            return res.sendStatus(403);
        } else {
            res.json({ok:true});
        }

    } catch(err){
        console.log(err);
    }
}

export const getOwnerProductController = async(req, res) => {
    try{

        const products = await Product.find({vendor: req.user._id}).sort({createdAt:-1}).exec();
        return res.json(products)

    }catch(err){
        console.log(err)
    }
}