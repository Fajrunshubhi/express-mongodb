const Product = require("../models/product");
const db = require("../utils/database");

const getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        layout: "layouts/main-layout",
        pageTitle: "Add Product Page",
        path: "add-product",
        editing: false,
    });
};

const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title,
        price,
        imageUrl,
        description,
    })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/");
};

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect("/");
    }
    const id = req.params.id;
    Product.findById(id, (product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            layout: "layouts/main-layout",
            pageTitle: "Edit Product Page",
            path: "edit-product",
            editing: editMode,
            product: product,
        });
    });
};

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
            layout: "layouts/main-layout",
            pageTitle: "Admin Products Page",
            product: products,
            path: "/admin/products",
        });
    });
};

const postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, description, price);
    // console.log(product);
    product.save();
    res.redirect("/admin/products");
};

const deleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.deleteById(id);
    res.redirect("/admin/products");
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    deleteProduct,
};
