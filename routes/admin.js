import express from "express";
import adminController from "../controllers/admin.js"; // Ensure the correct file extension

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.AddProduct);
router.get("/edit-product/:int_product_id", adminController.getEditProduct);
router.post("/edit-product", adminController.editProduct);
router.post("/delete-product", adminController.deleteProduct);
export default router;
