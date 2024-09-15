import express from "express";
import adminController from "../controllers/admin.js"; // Ensure the correct file extension

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.AddProduct);

export default router;
