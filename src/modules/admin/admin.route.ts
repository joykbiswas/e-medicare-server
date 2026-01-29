import express, { Router } from "express";

import auth, { UserRole } from "../../middlewares/auth";

import { AdminController } from "./admin.controller";
import { MedicineController } from "../medicine/medicine.controller";
import { OrderController } from "../order/order.controller";
import { CategoryController } from "../category/category.controller";

const router = express.Router();

// /api/admin

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUsers);
router.get("/medicines", auth(UserRole.ADMIN), MedicineController.getAllMedicines);
router.get("/orders", auth(UserRole.ADMIN), AdminController.getAllOrders);
router.get("/categories", auth(UserRole.ADMIN), CategoryController.getAllCategories);
router.patch("/categories/:id",  auth(UserRole.ADMIN), AdminController.updateCategory);

// PATCH /api/admin/users/:id
router.patch("/users/:id", AdminController.updateUserStatus);

export const AdminRoutes: Router = router;
