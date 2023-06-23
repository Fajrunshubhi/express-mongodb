const Product = require("../models/product");
const getAddProduct = (req, res, next) => {
    res.render("add-product", {
        layout: "layouts/main-layout",
        pageTitle: "Add Product Page",
        path: "add-product",
    });
};

const postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

const getProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop", {
            layout: "layouts/main-layout",
            pageTitle: "My Shop page",
            product: products,
            path: "shop",
        });
    });
};

module.exports = { getAddProduct, postAddProduct, getProduct };
