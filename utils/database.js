const mysql = require("mysql");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "Fajrun", "FajrunSH12", {
    host: "localhost",
    port: "3307",
    dialect: "mysql",
});

module.exports = sequelize;
