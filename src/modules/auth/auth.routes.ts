import { Router } from "express";
import { register, login, me, logout } from "./auth.controller";
import { protect, fetchUserData } from "../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, fetchUserData, me);
router.post("/logout", logout);

export const authRouter = router;
