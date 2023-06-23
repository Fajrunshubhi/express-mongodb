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
    constructor(t) {
        this.title = t;
    }
    save() {
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
}
module.exports = Product;
