import express, { Router } from "express";
import { MedicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middlewares/auth";
// import auth, { UserRole } from "../../middlewares/auth";

const router =  express.Router();

router.post("/", auth(UserRole.ADMIN, UserRole.SELLER), MedicineController.createMedicine);
router.get("/",  MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getMedicineById);

export const MedicineRoutes: Router = router;
