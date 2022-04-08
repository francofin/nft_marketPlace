import express from 'express';
import { uploadImageController, removeImageController, createProductController} from '../controllers/product';
import {requireSignin, requireUserIsOwner} from '../middlewares'; 
const router = express.Router();


router.post("/product/upload-image", uploadImageController);
router.post("/product/remove-image", removeImageController);

router.post("/product", requireSignin, requireUserIsOwner, createProductController);

module.exports = router;