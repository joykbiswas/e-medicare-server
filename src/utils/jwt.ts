import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

console.log("JWT_SECRET loaded:", JWT_SECRET ? "✓ Present" : "✗ Missing - This will cause errors!");

export const signToken = (payload: object) => {
  console.log("Signing token with payload:", payload);
  console.log("JWT_SECRET:", JWT_SECRET ? "✓ Available" : "✗ Not available");
  
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
  }
  
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  console.log("Token signed successfully");
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
