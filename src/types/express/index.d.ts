// types/custom.d.ts

import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adding user as an optional property to Request type
    }
  }
}

export {}; // Ensures this file is treated as a module
