// src/types/express.d.ts

import { User } from '../models/user';  // Import the User model from the appropriate path

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Declare the 'user' property on the Request object
    }
  }
}
