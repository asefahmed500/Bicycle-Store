import { Request, Response } from 'express';
import Product from '../models/product'; // Correct import for Product model
import Order from '../models/order';



export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;

    if (!email || !product || !quantity) {
      return res.status(400).json({
        message: 'Email, product, and quantity are required',
        success: false,
      });
    }

    const productData = await Product.findById(product);
    if (!productData || productData.quantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock for the product',
        success: false,
      });
    }

    const totalPrice = productData.price * quantity;

    const order = await Order.create({
      email,
      product,
      quantity,
      totalPrice,
    });

    productData.quantity -= quantity;
    await productData.save();

    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error: unknown) {  // Declare error as 'unknown'
    if (error instanceof Error) {  // Check if error is an instance of Error
      console.error(error.message);  // Log the error message
      res.status(400).json({
        message: 'Failed to create order',
        success: false,
        error: error.message,  // Safely access error message
      });
    } else {
      console.error(error);  // In case the error is not of type 'Error'
      res.status(400).json({
        message: 'Failed to create order',
        success: false,
        error: 'An unknown error occurred',
      });
    }
  }
};

// Get All Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('product');
    res.status(200).json({
      message: 'Orders retrieved successfully',
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve orders',
      success: false,
      error,
    });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('product');
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Order retrieved successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve order',
      success: false,
      error,
    });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Order updated successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update order',
      success: false,
      error,
    });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Order deleted successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete order',
      success: false,
      error,
    });
  }
};
