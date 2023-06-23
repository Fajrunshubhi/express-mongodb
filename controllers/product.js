const getAddProduct = (req, res, next) => {
    res.render("add-product", {
        layout: "layouts/main-layout",
        pageTitle: "Add Product Page",
        path: "add-product",
    });
};

const products = [];
const postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect("/");
};

const getProduct = (req, res, next) => {
    res.render("shop", {
        layout: "layouts/main-layout",
        pageTitle: "My Shop page",
        product: products,
        path: "shop",
    });
};

module.exports = { getAddProduct, postAddProduct, getProduct, products };
