const Product = require("../models/product");
const db = require("../utils/database");
const { ObjectId } = require("mongodb");

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

    const product = new Product(title, price, description, imageUrl);
    product
        .save()
        .then((result) => {
            console.log("Created Product");
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};

const getProducts = (req, res, next) => {
    Product.fetchAll()
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

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect("/");
    }
    const id = req.params.id;
    Product.findById(id)
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

const postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    console.log("ini adalah id", id);

    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        new ObjectId(id)
    );
    product
        .save()
        .then((result) => {
            console.log("UPDATED");
            console.log(result);
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

// const deleteProduct = (req, res, next) => {
//     const id = req.body.id;
//     Product.findByPk(id)
//         .then((product) => {
//             return product.destroy();
//         })
//         .then(() => {
//             console.log("Destroyed product success");
//             res.redirect("/admin/products");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
};
