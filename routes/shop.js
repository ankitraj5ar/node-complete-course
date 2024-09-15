import express from "express";
import shopController from "../controllers/shop.js"; // Add .js extension

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.addCart);
router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);

export default router;
