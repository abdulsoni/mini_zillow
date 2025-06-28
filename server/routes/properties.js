import express from 'express';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';
import upload from '../utils/multer.js';

const router = express.Router();
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updateProperty);
router.delete('/:id', verifyToken, verifyAdmin, deleteProperty);
export default router;