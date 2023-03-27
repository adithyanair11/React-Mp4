import express from "express";
import * as VideosController from '../controllers/videos';
import multer, { memoryStorage } from 'multer';


const storage = memoryStorage();

const upload = multer({storage})

const router = express.Router();


router.post('/video',  upload.single('file'),VideosController.postVideo);

router.get('/videos',VideosController.getVidoes);


export default router;