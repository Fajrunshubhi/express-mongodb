const express = require("express");
const router = express.Router();
const adminData = require("./admin");
const { getProduct } = require("../controllers/product");

router.get("/", getProduct);

module.exports = router;
