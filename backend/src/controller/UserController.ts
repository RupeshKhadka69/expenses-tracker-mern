import { Request, Response, NextFunction } from "express";
import User from "../model/userSchema";
import { hashPassword, comparePassword } from "../utils/comparepassword";
import makeToken from "../utils/token";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: "field not completed" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const newHashPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: newHashPassword });
    await newUser.save();
    const token = makeToken(res, newUser._id, true);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "field not completed" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "user doen't exits" });
  }
  try {
    if (await comparePassword(password, existingUser.password)) {
      const token = makeToken(res, existingUser._id, true);
      return res.status(200).json({
        message: "sucess",
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
        token,
      });
    } else {
      return res.status(401).json({
        message: "password doesnot match",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  return res.status(200).json(user);
};
const logout = async (req: Request, res: Response)=> {
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "log out sucessful" });
}
export { register, login, getProfile,logout };
