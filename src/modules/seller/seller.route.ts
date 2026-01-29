import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { SellerController } from "./seller.controller";
import { MedicineController } from "../medicine/medicine.controller";

const router = Router();

// Medicines management
router.post("/medicines", auth(UserRole.SELLER), MedicineController.createMedicine);
router.put("/medicines/:id", auth(UserRole.SELLER), SellerController.updateMedicine);
router.delete("/medicines/:id", auth(UserRole.SELLER), SellerController.deleteMedicine);
router.get("/medicines", auth(UserRole.SELLER), MedicineController.getAllMedicines);

// Seller orders management
router.get("/orders", auth(UserRole.SELLER), SellerController.getOrders);
router.patch("/orders/:id", auth(UserRole.SELLER), SellerController.updateOrderStatus);

export const SellerRoutes = router;
