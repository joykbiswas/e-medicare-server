import {NextFunction, Request, Response, Router} from 'express';
import {auth as betterAuth} from '../lib/auth'
import { prisma } from '../lib/prisma';
import jwt from "jsonwebtoken";

export enum UserRole{
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}



declare global {
    namespace Express {
        interface Request{
            user?:{
                id: string;
                email: string;
                name: string;
                role: string;
                 phone?: string | null;
        status?: string | null;
        isBanned?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
            }
        }
    }
}


interface JwtPayload {
  userId: string;
  role?: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  console.log("Protect middleware triggered");
  console.log("Request cookies:", req.cookies);
  console.log("Request headers:", req.headers);
  
  // Try to get token from cookies first, then from Authorization header
  let token = req.cookies?.token;
  
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remove "Bearer " prefix
      console.log("Token found in Authorization header");
    }
  }
  
  console.log("Token found:", token ? "✓ Yes" : "✗ No");
  
  if (!token) {
    console.log("No token provided - Unauthorized");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log("Token verified successfully:", decoded);
    
    // Store userId in request for fetching user data later if needed
    req.user = {
      id: decoded.userId,
      email: "",
      name: "",
      role: decoded.role || "USER",
    };
    console.log("User set in request:", req.user);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Middleware to fetch user data from database
export const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "User not found in request" });
    }

    console.log("Fetching user data for userId:", req.user.id);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   role: true,
      //   phone: true,
      //   status: true,
      //   isBanned: true,

      // } 
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // ❌ remove password before attaching
    const { password, ...safeUser } = user;

    req.user = {
      ...safeUser,
      role: safeUser.role || "CUSTOMER",
    };

    console.log("Full user data attached to req.user:", req.user);
    next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Error fetching user data" });
  }
};
