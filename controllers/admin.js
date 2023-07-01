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
    Product.findByPk(id)
        .then((product) => {
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
        })
        .catch((err) => {
            console.log(err);
        });
};

const getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render("admin/products", {
                layout: "layouts/main-layout",
                pageTitle: "Admin Products Page",
                product: products,
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findByPk(id)
        .then((product) => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        })
        .then((result) => {
            console.log("UPDATED");
            console.log(result);
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
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
