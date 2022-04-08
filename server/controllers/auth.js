const User = require('../models/User')
import {hashedPassword, verifyPassword} from '../utils/auth';
import jwt from 'jsonwebtoken';
import SES from '../config/aws';
import {nanoid} from 'nanoid';

export const loginController = async (req, res) => {
    try{
        console.log(req.body);
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).send("Please enter a valid email and password");
        }

        let user = await User.findOne({email}).exec();
        if(!user){
            res.status(400).send("User not found.");
        }

        const verify = await verifyPassword(password, user.password);

        if(!verify){
            return res.status(400).send("Wrong Password");
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        user.password = undefined;
        res.cookie('token', token, {
            httpOnly:true,
            // secure:true
        });
        res.json(user);
        


    }catch(err){
        console.log(err);
        res.status(400).send("Please enter a valid email and password");
    }
}


export const registerController = async (req, res) => {
    try{
        // console.log(req.body);
        const{firstName, lastName, userName, email, password} = req.body;
        if(!firstName || !lastName || !userName || !email || !password){
            res.status(400).send("All fields are required");
        }
        if(!password || password.length <6){
            return res.status(400).send("Password is too short.");
        }

        let userExist = await User.findOne({email}).exec();
        if(userExist){
            return res.status(400).send("Email already in use.");
        }

        const passwordHashed = await hashedPassword(password);
        const user = await new User({
            firstName, 
            lastName, 
            userName,
            email, 
            password: passwordHashed
        }).save();

        console.log("saved user", user);
        return res.json({ok:true});
    }catch(err){
        console.log(err);
        return res.status(400).send("Incorrect Details");
    }
}


export const logoutController = async (req, res) => {

    try{
        res.clearCookie('token');
        return res.json({message:"Signout Success"});

    }catch(err){
        console.log(err)
    }
    
}

export const currentUserController = async(req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password").exec();

        console.log("CURRENT USER FROM ID", user);

        return res.json({ok:true});

    } catch(err){
        console.log(err)
    }
}

export const resetPasswordController = async(req, res) => {

    try{

        const {email, code, newPassword} = req.body;
        const newHashedPassword = await hashedPassword(newPassword);
        const user = await User.findOneAndUpdate({email, code}, {password: newHashedPassword, passwordResetCode: ""}).exec();
        res.json({ok:true});

    } catch(err){
        console.log(err);
        res.status(400).send("Error, Please try again.")
    }
}

export const forgotPasswordController = async(req, res) => {
    
    try{
        const {email} = req.body;
        const shortCode = nanoid().toUpperCase();
        console.log(email, shortCode);
        const user = await User.findOneAndUpdate({email}, {passwordResetCode: shortCode});
        if (!user){
            return res.status(400).send("User Not Found");
        }

        const params = {
            Source: process.env.EMAIL_FROM,
            Destination:{
                ToAddresses: [email],
            },
            // ReplyToAddresses: [process.env.EMAIL_FROM],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `
                            <html>
                                <h1> Reset Password Link</h1>
                                <p>Please use the code below to reset your password</p>
                                <h2 style="color:green;"> ${shortCode} </h2>
                                <i>From your friends at theMaRkEt.com</i>
                            </htm>
                        `
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data:"Password Reset Code"
                },
            }
        };

        const emailSent = SES.sendEmail(params).promise();
        emailSent.then((data) => {
            console.log(data);
            res.json({ok:true})
        }).catch((err) => {
            console.log(err);
        })
    } catch(err){
        console.log(err);
    }
}

export const sendTestEmail = async(req, res) => {

    const params = {
        Source: process.env.EMAIL_FROM,
        Destination:{
            ToAddresses: ['francoiskieran89@gmail.com'],
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <html>
                            <h1> Reset Password Link</h1>
                            <p>Please use the link below to reset your password</p>
                        </htm>
                    `
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data:"Password Reset Link"
            },
        }
    };

    const emailSent = SES.sendEmail(params).promise();

    emailSent.then((data) => {
        console.log(data);
        res.json({ok:true})
    }).catch((err) => {
        console.log(err);
    })
}

