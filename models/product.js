const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "product.json"
);

const getProductFromFile = (callback) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return callback([]);
        } else {
            callback(JSON.parse(data));
        }
    });
};

class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    (p) => p.id === this.id
                );
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                this.id = Math.random().toString();
                console.log("from else");
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    }
    static fetchAll(callback) {
        getProductFromFile(callback);
    }
    static findById(id, callback) {
        getProductFromFile((products) => {
            const product = products.find((item) => {
                return item.id === id;
            });
            callback(product);
        });
    }
    static deleteById(id) {
        getProductFromFile((products) => {
            const product = products.find((prod) => {
                prod.id === id;
            });
            const updateProduct = products.filter((prod) => {
                return prod.id !== id;
            });
            fs.writeFile(p, JSON.stringify(updateProduct), (err) => {
                if (err) {
                    throw err;
                } else {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
}
module.exports = Product;
