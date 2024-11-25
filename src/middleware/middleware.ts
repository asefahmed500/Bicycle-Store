import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

export const setupMiddleware = (app: express.Application) => {
  // Enable CORS
  app.use(cors());
  
  // Serve static files from the 'public' directory
  app.use(express.static('public'));
  
  // Parse JSON request bodies
  app.use(express.json());

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));

  // A simple logger middleware (Optional)
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
};

// 404 Handler for Undefined Routes
export const routeNotFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
  });
};

// Error Handling Middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    success: false,
    error: err.message,
  });
};
