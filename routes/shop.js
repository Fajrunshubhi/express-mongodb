const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProduct);
// router.get("/products/delete");
router.get("/products/:id", shopController.getProductById);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
// router.get("/checkout", shopController.getCheckout);
router.post("/create-order", shopController.postOrder);
router.get("/orders", shopController.getOrder);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
