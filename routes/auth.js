import express from "express";
import authController from "../controllers/auth.js"; // Ensure the correct file extension

const router = express.Router();

// /admin/add-product => GET
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
// router.get("/products", adminController.getProducts);

export default router;
