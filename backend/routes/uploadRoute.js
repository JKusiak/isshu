import express from 'express';
import { deleteImage, setupDiskStorage, uploadImage } from '../controllers/uploadsController.js';


export const protectedImageRouter = express.Router();

const upload = setupDiskStorage();

// middleware triggered whenever form has field named 'imageUpload',
// used to save images to uploads directory
protectedImageRouter.route('/add/:imageId').post(upload.single('imageUpload'), uploadImage);

protectedImageRouter.route('/delete/:imageId').delete(deleteImage);
