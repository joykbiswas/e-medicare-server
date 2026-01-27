import { Router } from "express";
import { register, login, me } from "./auth.controller";
import { protect, fetchUserData } from "../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, fetchUserData, me);

export const authRouter = router;
