const User = require('../models/User');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import slugify from 'slugify';
import queryString from 'query-string';
import AWS from 'aws-sdk';
import {nanoid} from 'nanoid';

const awsConfig = {
    accessKeyId:process.env.AWS_ACCESS_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion:process.env.AWS_API_VERSION
};

const S3 = new AWS.S3(awsConfig);

export const uploadImageController = async(req, res) => {
    console.log(req.body);
    try{
        const {image} = req.body;
        if(!image){
            return res.status(400).send("No Image");
        }
        //send base64 data to S3
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const type = image.split(';')[0].split('/')[1];

        const params = {
            Bucket:"thetradingfloor",
            Key: `${nanoid()}.${type}`,
            Body:base64Data,
            ACL: 'public-read',
            ContentEncoding: "base64",
            ContentType:`image/${type}`,
        }

        //upload to S3

        S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                return res.sendStatus(400);
            } 

            console.log(data);
            res.send(data);
        });

    } catch(err){
        console.log(err)
    }
}

export const removeImageController = async(req, res) => {
    console.log(req.body);
    try{
        const {image} = req.body;
        const params ={
            Bucket:"thetradingfloor",
            Key: image.Key,
        }
        //send req to s3

        S3.deleteObject(params, (err, data) => {
            if(err){
                console.log(err)
                res.sendStatus(400);
            }

            res.send({ok:true});
        })
    }catch(err){

    }
}

export const createProductController = async(req, res) => {
    console.log(req.body);
    try{
        
        const product = await new Product({
            slug: slugify(req.body.productName),
            vendor: req.user._id,
            ...req.body,
        }).save();

        res.json(product);

    } catch(err){
        console.log(err);
        return res.status(400).send("Adding Product Failed, Try Again");
    }
}