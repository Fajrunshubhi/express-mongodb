const getDb = require("../utils/database").getDb;
const mongoDb = require("mongodb");

class Product {
    constructor(title, price, des, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = des;
        this.imageUrl = imageUrl;
        this._id = id ? new mongoDb.ObjectId(id) : null;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // update product
            dbOp = db
                .collection("products")
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection("products").insertOne(this);
        }
        return dbOp
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection("products")
            .find()
            .toArray()
            .then((products) => {
                console.log(products);
                return products;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static findById(id) {
        const db = getDb();
        return db
            .collection("products")
            .find({ _id: new mongoDb.ObjectId(id) })
            .next()
            .then((products) => {
                if (products) {
                    products._id = id;
                    console.log(products);
                    return products;
                } else {
                    console.log("Product Not Found");
                    return null;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
