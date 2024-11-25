import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController';


const router = express.Router();

router.post('/', createOrder); // Create an order
router.get('/', getAllOrders); // Get all orders
router.get('/:id', getOrderById); // Get order by ID
router.put('/:id', updateOrder); // Update order by ID
router.delete('/:id', deleteOrder); // Delete order by ID

export default router;
