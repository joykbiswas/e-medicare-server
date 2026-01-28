import { Router } from "express";
import { OrderController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";
// import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get("/", auth(UserRole.CUSTOMER), OrderController.getMyOrders);
router.get("/:id",  OrderController.getOrderById);
router.patch("/:id/cancel", auth(UserRole.CUSTOMER), OrderController.cancelOrder);

export const OrderRoutes: Router = router;
