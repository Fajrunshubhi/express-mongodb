const fs = require("fs");
const path = require("path");
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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        this.id = Math.random().toString();
        getProductFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    throw err;
                }
            });
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
}
module.exports = Product;
