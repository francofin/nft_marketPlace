const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

const videoSchema = new Schema({
    videoName:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    description: {
        type:String,
    },
    content:{
        type:{},
        minlength:200,
    },
    videoLink:{},
    free_preview:{
        type:Boolean,
        default:false
    },

}, {timestamps:true});

const productSchema = new Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    description: {
        type:String,
        required:true,
    },
    additionalDetails:{
        type:String
    },
    content:{
        type:{},
        minlength:200,
    },
    price:{
        type:Number,
        default:9.99
    },
    images:[{}],
    category:{
        type:String,
        require:true
    },
    published:{
        type:Boolean,
        default:false
    },
    paid:{
        type:Boolean,
        default:true
    },
    forTransfer:{
        type:Boolean,
        default:false
    },
    vendor:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    tradeDonateCondition:{
        type:String,
    },
    videos:[videoSchema]
}, {timestamps:true});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;