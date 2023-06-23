const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const { getAddProduct, postAddProduct } = require("../controllers/product");

const router = express.Router();
router.get("/add-product", getAddProduct);
router.post("/add-product", postAddProduct);

module.exports = { router };
