const getDb = require("../utils/database").getDb;
const mongoDb = require("mongodb");

class Product {
    constructor(title, price, des, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = des;
        this.imageUrl = imageUrl;
        this._id = id ? new mongoDb.ObjectId(id) : null;
        this.userId = userId;
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
            .then((result) => {})
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

    static deleteById(id) {
        const db = getDb();
        return db
            .collection("products")
            .deleteOne({ _id: new mongoDb.ObjectId(id) })
            .then((result) => {
                console.log("Deleted");
            })
            .catch((err) => {
                console.log("Errorrrrr");
            });
    }
}

module.exports = Product;
