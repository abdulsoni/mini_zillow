import express from 'express';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty,bookMarkProperty,giveRatingToProperty } from '../controllers/propertyController.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';
import upload from '../utils/multer.js';

const router = express.Router();
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createProperty);
router.get('/', verifyToken,getProperties);
router.get('/:id',verifyToken, getPropertyById);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updateProperty);
router.delete('/:id', verifyToken, verifyAdmin, deleteProperty);
router.post('/:id/bookmark', verifyToken, bookMarkProperty);
router.post('/:id/rate', verifyToken, giveRatingToProperty);
export default router;