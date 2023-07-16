const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const expressLayouts = require("express-ejs-layouts");
const errorController = require("./controllers/error");

const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/users");

// Tambahkan middleware berikut sebelum rute-rute Anda
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("64b37e739826b6a2cae05462");
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    } catch (error) {
        console.log(`Error retrieving user: ${error.message}`);
    }
});

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`);
    });
});
