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

// const getCart = (req, res, next) => {
//     Cart.fetchAll((cart) => {
//         Product.fetchAll((products) => {
//             // const cartProducts = [];
//             let cartProducts = { productData: [], totalPrice: 0 };

//             for (const product of products) {
//                 const cartProductData = cart.products.find(
//                     (prod) => prod.id === product.id
//                 );
//                 if (cartProductData) {
//                     cartProducts.productData.push({
//                         ...product,
//                         qty: cartProductData.qty,
//                     });

//                     cartProducts.totalPrice = cart.totalPrice;
//                 }
//             }
//             console.log(cartProducts.productData);

//             res.render("shop/cart", {
//                 layout: "layouts/main-layout",
//                 pageTitle: "My Cart",
//                 product: cartProducts,
//                 // totalPrice: totalPrice,
//                 path: "/cart",
//             });
//         });
//     });
// };
// const postCart = (req, res, next) => {
//     const id = req.body.id;
//     Product.findById(id, (product) => {
//         Cart.addProduct(id, product.price);
//     });
//     res.redirect("/cart");
//     // res.render("shop/cart", {
//     //     layout: "layouts/main-layout",
//     //     pageTitle: "My Cart",
//     //     path: "/cart",
//     // });
// };

// const getCheckout = (req, res, next) => {
//     res.render("/checkout", {
//         layout: "layouts/main-layout",
//         pageTitle: "Checkout",
//         path: "/checkout",
//     });
// };

// const getOrders = (req, res, next) => {
//     res.render("shop/orders", {
//         layout: "layouts/main-layout",
//         pageTitle: "Orders",
//         path: "/orders",
//     });
// };

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

// const postCartDeleteProduct = (req, res, next) => {
//     const id = req.body.id;
//     Product.findById(id, (product) => {
//         Cart.deleteProduct(id, product.price);
//         res.redirect("/cart");
//     });
// };

module.exports = {
    getProduct,
    getIndex,
    // getIndex,
    // getCart,
    // getCheckout,
    // getOrders,
    getProductById,
    // postCart,
    // postCartDeleteProduct,
};
