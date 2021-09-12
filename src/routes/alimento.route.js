import { Router } from "express";
import cloudinary from "cloudinary"
import { createFood, getAllFoods, getFoodByID } from "../controllers/alimento.controller";

const router = Router();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  
});

router.get('/food', getAllFoods);
router.post('/food',createFood);
router.get('/food/:nombre_alimento', getFoodByID);



export default router;