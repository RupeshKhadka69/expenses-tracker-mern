import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/userSchema";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const shield = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT as string) as JwtPayload;

        if (!decoded) {
            return res.status(401).json({ message: " token not decoded" });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default shield;
