import express from 'express';
import { createUser, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'; // Import the authentication middleware

const router = express.Router();

// Create a new user (no authentication required for user creation)
router.post('/', createUser);

// Get user by ID (authentication required)
router.get('/:id', authMiddleware, getUserById);

// Update user by ID (authentication required)
router.put('/:id', authMiddleware, updateUser);

// Delete user by ID (authentication required)
router.delete('/:id', authMiddleware, deleteUser);

export default router;
