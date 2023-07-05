const getDb = require("../utils/database").getDb;
const mongoDb = require("mongodb");

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
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
}

module.exports = User;
