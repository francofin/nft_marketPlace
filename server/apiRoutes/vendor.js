import express from 'express';
import {makeVendorController, accountStatusController, currentVendorController, getOwnerProductController} from '../controllers/vendor';
import {requireSignin} from '../middlewares'; 
const router = express.Router();


router.post("/make-vendor", requireSignin, makeVendorController);
router.post('/get-account-status', requireSignin, accountStatusController);
router.get('/current-vendor', requireSignin, currentVendorController);
router.get('/vendor/products', requireSignin, getOwnerProductController);

module.exports = router;