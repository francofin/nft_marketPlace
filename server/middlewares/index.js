import expressJwt from 'express-jwt';
import User from '../models/User';

export const requireSignin = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});

export const requireUserIsOwner = async(req, res, next) => {
    
    try{
        const user = await User.findById(req.user._id).exec();
        console.log(user);
        if(!user.role.includes("Vendor")){
            return res.sendStatus(403);
        } else{
            next();
        }

    } catch(err){
        console.log(err);
    }
}