import { Request, Response } from 'express';
import product from '../models/product';




// Create a Bicycle
export const createProduct = async (req: Request, res: Response) => {
  try {
    const products = await product.create(req.body);
    res.status(201).json({
      message: 'Bicycle created successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create bicycle',
      success: false,
      error,
    });
  }
};

// Get All Bicycles
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await product.find();
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve bicycles',
      success: false,
      error,
    });
  }
};

// Get Bicycle by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const products = await product.findById(req.params.id);
    if (!products) {
      return res.status(404).json({
        message: 'Bicycle not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve bicycle',
      success: false,
      error,
    });
  }
};

// Update Bicycle
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const products = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!products) {
      return res.status(404).json({
        message: 'Bicycle not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bicycle updated successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update bicycle',
      success: false,
      error,
    });
  }
};

// Delete Bicycle
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const products = await product.findByIdAndDelete(req.params.id);
    if (!products) {
      return res.status(404).json({
        message: 'Bicycle not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bicycle deleted successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete bicycle',
      success: false,
      error,
    });
  }
};
