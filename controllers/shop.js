const Product = require("../models/product");
const Cart = require("../models/cart");

const getProduct = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render("shop/product-list", {
                layout: "layouts/main-layout",
                pageTitle: "My Shop page Product",
                product: products,
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render("shop/index", {
                layout: "layouts/main-layout",
                pageTitle: "My Shop page",
                product: products,
                path: "shop",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((products) => {
            res.render("shop/cart", {
                layout: "layouts/main-layout",
                path: "/cart",
                pageTitle: "Your Cart",
                products: products,
            });
        })
        .catch((err) => {
            throw err;
        });
};
const postCart = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/cart");
};

const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.id;
    console.log("ini prod id: ", prodId);
    req.user
        .deleteItemFromCart(prodId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getProductById = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then((product) => {
            res.render("shop/product-detail", {
                layout: "layouts/main-layout",
                pageTitle: "Detail Product",
                product: product,
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then((result) => {
            console.log(result);
            res.redirect("/orders");
        })
        .catch((err) => {
            // console.log(err);
            // throw err;
        });
};

const getOrder = (req, res, next) => {
    req.user
        .getOrders()
        .then((orders) => {
            console.log(orders);
            res.render("shop/orders", {
                layout: "layouts/main-layout",
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders,
            });
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = {
    getProduct,
    getIndex,
    // getIndex,
    getCart,
    getOrder,
    postOrder,
    getProductById,
    postCart,
    postCartDeleteProduct,
};
