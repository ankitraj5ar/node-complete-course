import express from "express";
import shopController from "../controllers/shop.js"; // Add .js extension

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:int_product_id", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.addCart);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);
router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);
router.post("/create-order", shopController.createOrder);

export default router;
