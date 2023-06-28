const { error } = require("console");
const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (err) {
                throw err;
            } else {
                cart = JSON.parse(fileContent);
            }
            // analyze cart => find existing product
            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // add new product / incrase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = (
                parseInt(cart.totalPrice) + parseInt(productPrice)
            ).toString();

            fs.writeFile(p, JSON.stringify(cart), (error) => {
                if (error) {
                    throw new Error("Cannot write file cart");
                }
            });
        });
    }
    static fetchAll(callback) {
        fs.readFile(p, "utf8", (err, data) => {
            if (err) {
                return callback([]);
            } else {
                callback(JSON.parse(data));
                // console.log(data);
            }
        });
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                throw err;
            } else {
                const updateCart = { ...JSON.parse(fileContent) };
                const product = updateCart.products.find(
                    (prod) => prod.id === id
                );
                if (!product) {
                    return;
                }
                const productQty = product.qty;
                updateCart.products = updateCart.products.filter(
                    (prod) => prod.id !== id
                );
                updateCart.totalPrice =
                    updateCart.totalPrice - productPrice * productQty;

                fs.writeFile(p, JSON.stringify(updateCart), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    }
}

module.exports = Cart;
