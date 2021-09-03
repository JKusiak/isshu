import express from 'express';
import { checkIfExsists, deleteImage, setupDiskStorage, uploadImage } from '../controllers/uploadsController.js';


export const protectedImageRouter = express.Router();

const upload = setupDiskStorage();

protectedImageRouter.route('/get/:path').get(checkIfExsists);

// middleware triggered whenever form has field named 'imageUpload',
// used to save images to uploads directory
protectedImageRouter.route('/add/:imageId').post(upload.single('imageUpload'), uploadImage);

protectedImageRouter.route('/delete/:path').delete(deleteImage);
