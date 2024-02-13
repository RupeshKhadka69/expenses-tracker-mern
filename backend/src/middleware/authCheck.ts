import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt,{JwtPayload} from "jsonwebtoken";
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
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT as string) as JwtPayload;;

      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default shield;
