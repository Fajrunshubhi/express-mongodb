const fs = require("fs");
const path = require("path");

class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "product.json"
        );
        fs.readFile(p, (err, data) => {
            let products = [];
            if (err) {
                throw err;
            } else {
                products = JSON.parse(data);
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }
    static fetchAll(callback) {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "product.json"
        );
        fs.readFile(p, (err, data) => {
            if (err) {
                return callback([]);
            } else {
                callback(JSON.parse(data));
            }
        });
    }
}
module.exports = Product;
