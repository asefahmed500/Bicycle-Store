import express from 'express';
import mongoose from 'mongoose';
import { setupMiddleware, errorHandler, routeNotFoundHandler } from './middleware/middleware';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import connectDB from './config/db';
// Import the connectDB function

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware Setup
setupMiddleware(app);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Bicycle Store API!');
});

// Routes should be defined before the route not found handler
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// 404 Handler (for undefined routes) should be at the bottom
app.use(routeNotFoundHandler);

// Error Handling Middleware should be at the bottom
app.use(errorHandler);

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
