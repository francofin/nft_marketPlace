const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String, 
        trim: true, 
        required:true
    },
    lastName:{
        type: String, 
        trim: true, 
        required:true
    },
    userName:{
        type: String, 
        trim: true, 
        required:true
    },
    email:{
        type: String, 
        trim: true, 
        required:true,
        unique:true
    },
    password:{
        type: String, 
        required:true,
        min: 6,
        max:64,
    },
    images:{
        type:String,
        default:"/avatar.png"
    },
    role:{
        type:[String],
        default:['Subscriber'],
        enum:['Subscriber', 'Admin', 'Vendor', 'Donor'],
    },
    stripe_account_id:'',
    stripe_seller:{},
    stripeSession:{},
    passwordResetCode: {
        data:String,
        default:''
    },
},
{timestamps:true});


const User = mongoose.model("User", userSchema);

module.exports = User;