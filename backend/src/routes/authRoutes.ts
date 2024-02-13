import express from "express"
import { register,login,getProfile,logout } from "../controller/UserController";
import shield from "../middleware/authCheck";
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout)
router.get("/profile",shield,getProfile)
export default router; 