import jwt, { JwtPayload } from "jsonwebtoken";
import 'dotenv/config'

const TOKEN_SECRET = process.env["TOKEN_SECRET"] as string;

if (!TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET environment variable is not defined");
}
interface TokenPayload {
  userId: string;
}

const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "30d" });
};

const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken };
