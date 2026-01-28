import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = Router();

// Customer can create review
router.post("/", auth(UserRole.CUSTOMER), ReviewController.createReview);


export const ReviewRoutes = router;
