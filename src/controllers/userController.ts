// src/controllers/userController.ts

import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcryptjs'; // Use bcryptjs for hashing and comparing passwords
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required',
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
        success: false,
      });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create user',
      success: false,
      error: (error as Error).message,
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve user',
      success: false,
      error: (error as Error).message,
    });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'User updated successfully',
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update user',
      success: false,
      error: (error as Error).message,
    });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete user',
      success: false,
      error: (error as Error).message,
    });
  }
};

// Login user and generate a JWT token
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    // Check if password matches using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      success: true,
      data: { token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to login',
      success: false,
      error: (error as Error).message,
    });
  }
};
