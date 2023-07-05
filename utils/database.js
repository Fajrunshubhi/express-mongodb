const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://jrun:FajrunSH12@cluster0.o9sy9im.mongodb.net/shop?retryWrites=true&w=majority"
    )
        .then((client) => {
            console.log("connected");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No Database Found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
