const getDb = require("../utils/database").getDb;
const mongoDb = require("mongodb");

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }

    static async findById(id) {
        const db = getDb();
        try {
            const user = await db
                .collection("users")
                .findOne({ _id: new mongoDb.ObjectId(id) });
            return user;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex((cp) => {
        //     return cp._id === product._id;
        // });
        const updateCart = {
            items: [
                { productId: new mongoDb.ObjectId(product._id), quantity: 1 },
            ],
        };
        const db = getDb();
        return db.collection("users").updateOne(
            {
                _id: new mongoDb.ObjectId(this._id),
            },
            { $set: updateCart }
        );
    }
}

module.exports = User;
