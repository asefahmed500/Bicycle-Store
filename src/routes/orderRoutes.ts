import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';


const router = express.Router();

// Apply authMiddleware to protect routes that require authentication
router.post('/', authMiddleware, createOrder); // Create an order
router.get('/', authMiddleware, getAllOrders); // Get all orders
router.get('/:id', authMiddleware, getOrderById); // Get order by ID
router.put('/:id', authMiddleware, updateOrder); // Update order by ID
router.delete('/:id', authMiddleware, deleteOrder); // Delete order by ID

export default router;
