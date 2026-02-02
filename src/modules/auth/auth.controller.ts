import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../lib/prisma";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { name, email, password,  phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword,  phone },
    });

    const token = signToken({ userId: user.id, role: user.role });
    console.log("Token created:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Registration successful for user:", user.email);
    res.status(201).json({
      success: true,
      message: "Registered",
      data: { id: user.id, name: user.name, email: user.email, },
    });
  } catch (error) {
    console.error("Register error:", error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Login attempt with body:", req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    console.log("Finding user with email:", email);
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("User found:", user.email);
    console.log("Comparing passwords...");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      console.log("Password does not match for user:", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("Password matched! Creating token...");
    const token = jwt.sign({userId: user.id, name: user.name, email: user.email, role: user.role}, process.env.JWT_SECRET as string, {
        expiresIn: '7d'
    })
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    console.log({token});
    console.log("Login successful for user:", user.email);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: req.user });

};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // Note: You can add path if you set it during creation
      // path: "/",
    });

    // Optional: Also clear any other auth cookies you might have
    // res.clearCookie("refreshToken", { ... });

    console.log("Logout successful");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};
