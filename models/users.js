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

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map((i) => {
            return i._id;
        });

        return db
            .collection("products")
            .find({
                _id: {
                    $in: productIds.map((id) => {
                        return new mongoDb.ObjectId(id);
                    }),
                },
            })
            .toArray()
            .then((products) => {
                return products.map((p) => {
                    return {
                        ...p,
                        quantity: this.cart.items.find((i) => {
                            return i._id.toString() === p._id.toString();
                        }).quantity,
                    };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex((cp) => {
            return cp._id === product._id;
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                ...product,
                quantity: newQuantity,
            });
        }
        const updateCart = {
            items: updatedCartItems,
        };
        const db = getDb();
        return db.collection("users").updateOne(
            {
                _id: new mongoDb.ObjectId(this._id),
            },
            { $set: { cart: updateCart } }
        );
    }
}

module.exports = User;
