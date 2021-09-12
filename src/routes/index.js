import { Router } from 'express';
import { createUser, GetUserByEmail, getUsuario, imagesUsuario } from '../controllers/usuario.controller';
import cloudinary from 'cloudinary';


const router = Router();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  
});


router.get('/user', getUsuario);

router.post('/user', createUser);

router.get('/user/:correo_electronico', GetUserByEmail)
router.get('/images/add', (req, res) => {
    res.render('image_form');
})
router.post('/images/add', imagesUsuario)

export default router;