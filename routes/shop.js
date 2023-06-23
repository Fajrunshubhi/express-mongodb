const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProduct);
router.get("/products/delete");
router.get("/products/:id", shopController.getProductById);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

module.exports = router;
