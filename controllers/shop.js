const Product = require("../models/product");
const Cart = require("../models/cart");

const getProduct = (req, res, next) => {
    Product.fetchAll((products, fields) => {
        // console.log(products);
        // console.log(fields);
        res.render("shop/product-list", {
            layout: "layouts/main-layout",
            pageTitle: "Products Page",
            product: products,
            path: "/products",
        });
    });
};

const getIndex = (req, res, next) => {
    Product.fetchAll((products, fields) => {
        res.render("shop/index", {
            layout: "layouts/main-layout",
            pageTitle: "My Shop page",
            product: products,
            path: "shop",
        });
    });
};

const getCart = (req, res, next) => {
    Cart.fetchAll((cart) => {
        Product.fetchAll((products) => {
            // const cartProducts = [];
            let cartProducts = { productData: [], totalPrice: 0 };

            for (const product of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.productData.push({
                        ...product,
                        qty: cartProductData.qty,
                    });

                    cartProducts.totalPrice = cart.totalPrice;
                }
            }
            console.log(cartProducts.productData);

            res.render("shop/cart", {
                layout: "layouts/main-layout",
                pageTitle: "My Cart",
                product: cartProducts,
                // totalPrice: totalPrice,
                path: "/cart",
            });
        });
    });
};
const postCart = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, (product) => {
        Cart.addProduct(id, product.price);
    });
    res.redirect("/cart");
    // res.render("shop/cart", {
    //     layout: "layouts/main-layout",
    //     pageTitle: "My Cart",
    //     path: "/cart",
    // });
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
    // Product.findById(id, (product) => {
    //     res.render("shop/product-detail", {
    //         layout: "layouts/main-layout",
    //         pageTitle: "Detail Product",
    //         product: product,
    //         path: "/products",
    //     });
    // });
    Product.findById(id, (product, fields) => {
        console.log(product[0]);
        res.render("shop/product-detail", {
            layout: "layouts/main-layout",
            pageTitle: "Detail Product",
            product: product[0],
            path: "/products",
        });
    });
};

const postCartDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, (product) => {
        Cart.deleteProduct(id, product.price);
        res.redirect("/cart");
    });
};

module.exports = {
    getProduct,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProductById,
    postCart,
    postCartDeleteProduct,
};
