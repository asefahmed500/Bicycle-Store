import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use an environment variable for the secret key

// Define the structure of the JWT payload
interface JwtPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Send the response without returning
    res.status(401).json({
      message: 'Authorization token missing',
      success: false,
    });
    return; // End execution to prevent further code from running
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload; // Type the decoded value

    // Attach the decoded information (e.g., userId) to the request object
    req.user = decoded; // Now TypeScript knows 'user' is valid on req

    next(); // Call next() to pass control to the next middleware
  } catch (error) {
    // Properly handle the error and ensure it's correctly typed
    res.status(401).json({
      message: 'Invalid or expired token',
      success: false,
      error: (error instanceof Error) ? error.message : 'Unknown error',
    });
  }
};
