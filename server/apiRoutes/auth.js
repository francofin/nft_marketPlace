import express from 'express';
import {registerController, loginController, logoutController, currentUserController, sendTestEmail, forgotPasswordController, resetPasswordController} from '../controllers/auth';
import {requireSignin} from '../middlewares'; 
const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/current-user",requireSignin, currentUserController);
router.get("/send-email", sendTestEmail);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);



module.exports = router;