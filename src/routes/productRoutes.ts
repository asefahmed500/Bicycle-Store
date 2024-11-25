import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController';

const router = express.Router();

router.post('/', createProduct); // Create a bicycle
router.get('/', getAllProducts); // Get all bicycles
router.get('/:id', getProductById); // Get bicycle by ID
router.put('/:id', updateProduct); // Update bicycle by ID
router.delete('/:id', deleteProduct); // Delete bicycle by ID



export default router;
