const Product = require("../models/product");

const getProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            layout: "layouts/main-layout",
            pageTitle: "Products Page",
            product: products,
            path: "/products",
        });
    });
};

const getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
            layout: "layouts/main-layout",
            pageTitle: "My Shop page",
            product: products,
            path: "shop",
        });
    });
};

const getCart = (req, res, next) => {
    res.render("shop/cart", {
        layout: "layouts/main-layout",
        pageTitle: "My Cart",
        path: "/cart",
    });
};

const getCheckout = (req, res, next) => {
    res.render("/checkout", {
        layout: "layouts/main-layout",
        pageTitle: "Checkout",
        path: "/checkout",
    });
};

const getOrders = (req, res, next) => {
    res.render("shop/orders", {
        layout: "layouts/main-layout",
        pageTitle: "Orders",
        path: "/orders",
    });
};

const getProductById = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id, (product) => {
        res.render("shop/product-detail", {
            layout: "layouts/main-layout",
            pageTitle: "Detail Product",
            product: product,
            path: "/products",
        });
    });
};

module.exports = {
    getProduct,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProductById,
};
